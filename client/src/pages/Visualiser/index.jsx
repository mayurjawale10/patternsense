// Visualiser page — interactive algorithm step-through visualiser.
import { useState, useCallback } from 'react';
import PageWrapper from '../../components/layout/PageWrapper.jsx';
import Card from '../../components/common/Card.jsx';
import Button from '../../components/common/Button.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';
import { colors } from '../../constants/theme.js';

// ── Algorithms ────────────────────────────────────────────────────────────────

function bubbleSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k) });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], swapped: [j, j + 1], sorted: Array.from({ length: i }, (_, k) => n - 1 - k) });
      }
    }
  }
  steps.push({ array: [...a], comparing: [], sorted: Array.from({ length: n }, (_, k) => k) });
  return steps;
}

function binarySearchSteps(arr, target) {
  const steps = [];
  const a = [...arr].sort((x, y) => x - y);
  let lo = 0, hi = a.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ array: a, lo, hi, mid, target, found: a[mid] === target });
    if (a[mid] === target) break;
    if (a[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  if (steps[steps.length - 1]?.found === false) {
    steps.push({ array: a, lo: -1, hi: -1, mid: -1, target, found: false, notFound: true });
  }
  return steps;
}

function twoPointerSteps(arr, target) {
  const steps = [];
  const a = [...arr].sort((x, y) => x - y);
  let lo = 0, hi = a.length - 1;
  while (lo < hi) {
    const sum = a[lo] + a[hi];
    steps.push({ array: a, lo, hi, sum, target, found: sum === target });
    if (sum === target) break;
    if (sum < target) lo++;
    else hi--;
  }
  return steps;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ALGORITHMS = [
  { key: 'bubble', label: 'Bubble Sort' },
  { key: 'binary', label: 'Binary Search' },
  { key: 'twoPointer', label: 'Two Pointer' },
];

const DEFAULT_ARRAY = [5, 3, 8, 1, 9, 2, 7, 4, 6];
const DEFAULT_TARGET = 7;

// ── Bar colours ───────────────────────────────────────────────────────────────

function barColor(index, step, algo) {
  if (!step) return colors.primary;
  if (algo === 'bubble') {
    if (step.sorted?.includes(index)) return colors.teal;
    if (step.swapped?.includes(index)) return colors.coral;
    if (step.comparing?.includes(index)) return colors.amber;
    return colors.primary;
  }
  if (algo === 'binary') {
    if (step.found && index === step.mid) return colors.teal;
    if (index === step.mid) return colors.amber;
    if (index < step.lo || index > step.hi) return 'rgba(255,255,255,0.1)';
    return colors.primary;
  }
  if (algo === 'twoPointer') {
    if (step.found && (index === step.lo || index === step.hi)) return colors.teal;
    if (index === step.lo) return colors.amber;
    if (index === step.hi) return colors.coral;
    return colors.primary;
  }
  return colors.primary;
}

function stepDescription(step, algo) {
  if (!step) return '';
  if (algo === 'bubble') {
    if (step.sorted?.length === step.array?.length) return '✅ Array fully sorted!';
    if (step.swapped) return `Swapped indices ${step.swapped[0]} and ${step.swapped[1]}`;
    return `Comparing indices ${step.comparing?.[0]} and ${step.comparing?.[1]}`;
  }
  if (algo === 'binary') {
    if (step.notFound) return `❌ Target ${step.target} not found in array`;
    if (step.found) return `✅ Found ${step.target} at index ${step.mid}`;
    return `mid=${step.mid} (value ${step.array?.[step.mid]}), lo=${step.lo}, hi=${step.hi} — going ${step.array?.[step.mid] < step.target ? 'right' : 'left'}`;
  }
  if (algo === 'twoPointer') {
    if (step.found) return `✅ Found pair: ${step.array?.[step.lo]} + ${step.array?.[step.hi]} = ${step.target}`;
    return `lo=${step.lo} (${step.array?.[step.lo]}), hi=${step.hi} (${step.array?.[step.hi]}), sum=${step.sum} — ${step.sum < step.target ? 'move lo right' : 'move hi left'}`;
  }
  return '';
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function VisualiserPage() {
  const [algo, setAlgo] = useState('bubble');
  const [inputText, setInputText] = useState(DEFAULT_ARRAY.join(', '));
  const [targetText, setTargetText] = useState(String(DEFAULT_TARGET));
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const parseArray = () =>
    inputText
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => !isNaN(n))
      .slice(0, 12);

  const buildSteps = useCallback(() => {
    const arr = parseArray();
    const target = parseInt(targetText, 10) || DEFAULT_TARGET;
    if (algo === 'bubble') return bubbleSortSteps(arr);
    if (algo === 'binary') return binarySearchSteps(arr, target);
    if (algo === 'twoPointer') return twoPointerSteps(arr, target);
    return [];
  }, [algo, inputText, targetText]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRun = () => {
    stopPlay();
    const s = buildSteps();
    setSteps(s);
    setStepIndex(0);
  };

  const handleReset = () => {
    stopPlay();
    setSteps([]);
    setStepIndex(0);
  };

  const stopPlay = () => {
    if (intervalId) { clearInterval(intervalId); setIntervalId(null); }
    setPlaying(false);
  };

  const handlePlay = () => {
    if (playing) { stopPlay(); return; }
    const s = steps.length ? steps : buildSteps();
    if (!steps.length) { setSteps(s); setStepIndex(0); }
    setPlaying(true);
    let idx = stepIndex;
    const id = setInterval(() => {
      idx++;
      if (idx >= s.length) { clearInterval(id); setIntervalId(null); setPlaying(false); return; }
      setStepIndex(idx);
    }, 600);
    setIntervalId(id);
  };

  const currentStep = steps[stepIndex];
  const displayArray = currentStep?.array || parseArray();
  const maxVal = Math.max(...displayArray, 1);
  const BAR_HEIGHT = 160;

  return (
    <PageWrapper title="Algorithm Visualiser">
      <div className="space-y-6">
        {/* Controls */}
        <Card title="Configuration">
          <div className="flex flex-wrap gap-2 mb-4">
            {ALGORITHMS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => { setAlgo(a.key); handleReset(); }}
                className={`rounded-lg px-4 py-2 text-sm transition ${algo === a.key ? 'bg-violet-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
              >
                {a.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-48">
              <label className="mb-1 block text-xs text-zinc-500">Array (comma-separated, max 12)</label>
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="input-field"
                placeholder="e.g. 5, 3, 8, 1, 9"
              />
            </div>
            {(algo === 'binary' || algo === 'twoPointer') && (
              <div className="w-28">
                <label className="mb-1 block text-xs text-zinc-500">Target</label>
                <input
                  value={targetText}
                  onChange={(e) => setTargetText(e.target.value)}
                  className="input-field"
                  type="number"
                />
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={handleRun}>
                <Play className="h-4 w-4" /> Build Steps
              </Button>
              <Button variant="secondary" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Visualiser */}
        {steps.length > 0 && (
          <Card title={`${ALGORITHMS.find((a) => a.key === algo)?.label} — Step ${stepIndex + 1} / ${steps.length}`}>
            {/* Bars */}
            <div
              className="flex items-end justify-center gap-1 rounded-xl p-4"
              style={{ height: BAR_HEIGHT + 48, background: 'rgba(255,255,255,0.02)' }}
            >
              <AnimatePresence initial={false}>
                {displayArray.map((val, i) => (
                  <motion.div
                    key={i}
                    layout
                    className="flex flex-col items-center gap-1"
                    style={{ width: `${Math.max(32, Math.floor(480 / displayArray.length))}px` }}
                  >
                    <span className="text-xs text-zinc-400">{val}</span>
                    <motion.div
                      animate={{ height: `${(val / maxVal) * BAR_HEIGHT}px`, backgroundColor: barColor(i, currentStep, algo) }}
                      transition={{ duration: 0.3 }}
                      className="w-full rounded-t-md"
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-xs text-zinc-600">{i}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Step description */}
            <div className="mt-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 min-h-[2.5rem]">
              {stepDescription(currentStep, algo)}
            </div>

            {/* Step controls */}
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                disabled={stepIndex === 0 || playing}
                className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <Button onClick={handlePlay} variant={playing ? 'secondary' : 'primary'}>
                {playing ? 'Pause' : 'Auto Play'}
              </Button>
              <button
                type="button"
                onClick={() => setStepIndex((i) => Math.min(steps.length - 1, i + 1))}
                disabled={stepIndex === steps.length - 1 || playing}
                className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:text-white disabled:opacity-30"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              <span className="ml-auto text-xs text-zinc-600">
                {stepIndex + 1} / {steps.length}
              </span>
            </div>
          </Card>
        )}

        {/* Legend */}
        <Card title="Colour Legend">
          <div className="flex flex-wrap gap-4 text-sm">
            {algo === 'bubble' && (
              <>
                <LegendItem color={colors.amber} label="Comparing" />
                <LegendItem color={colors.coral} label="Swapped" />
                <LegendItem color={colors.teal} label="Sorted" />
                <LegendItem color={colors.primary} label="Unsorted" />
              </>
            )}
            {algo === 'binary' && (
              <>
                <LegendItem color={colors.amber} label="Mid pointer" />
                <LegendItem color={colors.teal} label="Found" />
                <LegendItem color={colors.primary} label="Search range" />
                <LegendItem color="rgba(255,255,255,0.1)" label="Eliminated" />
              </>
            )}
            {algo === 'twoPointer' && (
              <>
                <LegendItem color={colors.amber} label="Left pointer" />
                <LegendItem color={colors.coral} label="Right pointer" />
                <LegendItem color={colors.teal} label="Found pair" />
                <LegendItem color={colors.primary} label="Unsearched" />
              </>
            )}
          </div>
        </Card>
      </div>
    </PageWrapper>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-3 w-3 rounded-sm" style={{ background: color }} />
      <span className="text-zinc-400">{label}</span>
    </div>
  );
}
