import { useState, useMemo } from 'react';
import { generateCandidates } from '../utils/mockData';
import { calculateFinalScore, getPriorityStatus } from '../utils/engine';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState(() => generateCandidates(50));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [compareIds, setCompareIds] = useState([]);

  // Live Score Updater
  const updateCandidateScore = (id, metric, newScore) => {
    setCandidates(prev => prev.map(cand => {
      if (cand.id !== id) return cand;
      const updatedScores = { ...cand.scores, [metric]: parseInt(newScore) || 0 };
      const finalScore = calculateFinalScore(updatedScores);
      return {
        ...cand,
        scores: updatedScores,
        finalScore,
        status: getPriorityStatus(finalScore).label
      };
    }));
  };

  // Search Filter
  const filteredCandidates = useMemo(() => {
    return candidates.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [candidates, searchTerm]);

  // Dynamic Dashboard Metrics
  const metrics = useMemo(() => {
    const counts = { total: candidates.length, P0: 0, P1: 0, P2: 0, P3: 0 };
    candidates.forEach(c => {
      if (c.finalScore >= 90) counts.P0++;
      else if (c.finalScore >= 80) counts.P1++;
      else if (c.finalScore >= 70) counts.P2++;
      else counts.P3++;
    });
    return counts;
  }, [candidates]);

  // Toggle for comparison view
  const toggleCompare = (id) => {
    setCompareIds(prev => 
      prev.includes(id) 
        ? prev.filter(compareId => compareId !== id)
        : prev.length < 3 ? [...prev, id] : prev // Max 3 for comparison
    );
  };

  return {
    candidates: filteredCandidates,
    metrics,
    searchTerm,
    setSearchTerm,
    selectedId,
    setSelectedId,
    updateCandidateScore,
    compareIds,
    toggleCompare,
    rawCandidates: candidates // Needed for Detail/Compare views to get full data
  };
};