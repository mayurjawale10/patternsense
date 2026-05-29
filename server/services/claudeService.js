// All Claude API calls — one export per prompt type.
import Anthropic from '@anthropic-ai/sdk';
import { parseClaudeJson } from './claudeParse.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function ask(system, userMessage) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { data: null, error: 'ANTHROPIC_API_KEY is not configured on the server.' };
  }
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system,
      messages: [{ role: 'user', content: userMessage }],
    });
    const text = response.content[0]?.text || '';
    return parseClaudeJson(text);
  } catch (err) {
    return { data: null, error: err.message || 'AI request failed' };
  }
}

// Analyses a problem statement and returns pattern detection JSON.
export async function analyseProblem(problemText, targetRole) {
  const system = `You are an expert DSA coach. Analyse the given problem for role ${targetRole}.
Return ONLY a JSON object with no extra text:
{"detectedPatterns":[],"signalWords":[],"bestTimeComplexity":"","bestSpaceComplexity":"","hiddenConstraints":[],"difficultyPersonal":"","approachSummary":""}`;
  return ask(system, problemText);
}

// Analyses the user's thought process for cognitive mistakes.
export async function analyseThoughtProcess(problemText, thoughtProcess) {
  const system = `You are a DSA cognitive coach. Return ONLY JSON:
{"mistakeType":"Pattern Blindness|Overcomplicated|Edge Case Gap|Right Idea Wrong DS|Misread Constraint","mistakeAnalysis":"","whatToRecognise":""}`;
  return ask(system, `Problem:\n${problemText}\n\nThought process:\n${thoughtProcess}`);
}

// Generates a hint at the requested level (1-5).
export async function generateHint(problemText, hintLevel) {
  const system = `Level 1: conceptual nudge only. Level 2: pattern name only. Level 3: approach in plain English. Level 4: pseudocode. Level 5: full solution with explanation. Level requested: ${hintLevel}. Return ONLY JSON: {"hint":"","code":""}`;
  return ask(system, problemText);
}

// Generates interview questions based on mode and params.
export async function generateQuestions(mode, params) {
  const system = `Generate DSA questions in mode "${mode}". Return ONLY a JSON array of objects with title, statement, constraints, testCases, expectedTimeComplexity, expectedSpaceComplexity, solution.`;
  return ask(system, JSON.stringify(params));
}

// Generates a personalised study roadmap.
export async function generateRoadmap(params) {
  const system = `Return ONLY JSON: {"weeks":[{"weekNumber":1,"focus":"","days":[{"day":1,"date":"YYYY-MM-DD","patternFocus":"","problems":[{"title":"","difficulty":"","why":""}],"goal":""}]}]}`;
  return ask(system, JSON.stringify(params));
}

// Conducts mock interview — returns message text or scorecard JSON.
export async function interviewMessage(company, problem, conversationHistory, userMessage, userCode) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { data: null, error: 'ANTHROPIC_API_KEY is not configured.' };
  }
  const system = `You are a technical interviewer at ${company}. Problem: ${problem}. Candidate code: ${userCode || 'none'}. Conduct a natural interview. When complete, return ONLY JSON scorecard: {"communication":1,"approach":1,"optimisation":1,"edgeCases":1,"speed":1,"overallFeedback":""}. Otherwise plain text only.`;
  const historyText = conversationHistory.map((m) => `${m.role}: ${m.content}`).join('\n');
  try {
    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: `${historyText}\nuser: ${userMessage}` }],
    });
    const text = response.content[0]?.text || '';
    const parsed = parseClaudeJson(text);
    if (parsed.data?.overallFeedback !== undefined) return { data: parsed.data, type: 'scorecard', error: null };
    return { data: text, type: 'message', error: null };
  } catch (err) {
    return { data: null, type: 'message', error: err.message };
  }
}

// Compares two battle submissions and returns an AI verdict string.
export async function battleVerdict(problemText, creatorSub, opponentSub) {
  const system = 'Compare two DSA submissions. Return ONLY JSON: {"winner":"creator|opponent|tie","verdict":"2-3 sentence explanation"}';
  const result = await ask(system, JSON.stringify({ problemText, creatorSub, opponentSub }));
  return result;
}
