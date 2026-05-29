// Hook for problem analysis flow with loading guard.
import { useState } from 'react';
import { analyseProblem } from '../services/analyseService.js';
import { useProblemStore } from '../store/problemStore.js';

export function useAnalyse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setCurrentProblem, setLastAnalysis } = useProblemStore();

  const runAnalysis = async (payload) => {
    if (!payload.problemText?.trim()) {
      setError('Please paste a problem statement.');
      return null;
    }
    setLoading(true);
    setError(null);
    const { data, error: apiError } = await analyseProblem(payload);
    setLoading(false);
    if (apiError) {
      setError(apiError);
      return null;
    }
    const problem = data?.problem || data;
    setCurrentProblem(problem);
    setLastAnalysis(data);
    return data;
  };

  return { runAnalysis, loading, error };
}
