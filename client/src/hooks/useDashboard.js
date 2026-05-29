// Hook for dashboard data fetch with skeleton state.
import { useState, useEffect } from 'react';
import { fetchDashboard } from '../services/dashboardService.js';

export function useDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const result = await fetchDashboard();
      if (active) {
        setData(result.data);
        setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return { data, loading };
}
