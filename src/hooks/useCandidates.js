import { useState, useMemo } from 'react';
import { generateCandidates } from '../utils/mockData';
import { calculateFinalScore, getPriorityStatus } from '../utils/engine';

export const useCandidates = () => {
  const [candidates, setCandidates] = useState(() => generateCandidates(50));
  const [filters, setFilters] = useState({ search: '', sortBy: 'priority', status: 'All' });
  const [selectedId, setSelectedId] = useState(null);
  const [compareIds, setCompareIds] = useState([]);

  const updateCandidateScore = (id, metric, newScore) => {
    setCandidates(prev => prev.map(cand => {
      if (cand.id !== id) return cand;
      
      const updatedScores = { ...cand.scores, [metric]: parseInt(newScore) || 0 };
      const finalScore = calculateFinalScore(updatedScores);
      
      // If they scored 80+, they are shortlisted. Otherwise, if you touched a slider, they are reviewed.
      const hasBeenScored = updatedScores.assignment > 0 || updatedScores.video > 0;
      let newReviewStatus = cand.reviewStatus;
      if (finalScore >= 80) newReviewStatus = 'Shortlisted';
      else if (hasBeenScored) newReviewStatus = 'Reviewed';

      return {
        ...cand,
        scores: updatedScores,
        finalScore,
        status: getPriorityStatus(finalScore).label,
        reviewStatus: newReviewStatus
      };
    }));
  };

  const filteredCandidates = useMemo(() => {
    let result = [...candidates];
    if (filters.search) {
      result = result.filter(c => 
        c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        c.college.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status !== 'All') {
      result = result.filter(c => c.reviewStatus === filters.status);
    }
    if (filters.sortBy === 'priority') {
      result.sort((a, b) => b.finalScore - a.finalScore);
    } else if (filters.sortBy === 'assignment') {
      result.sort((a, b) => b.scores.assignment - a.scores.assignment);
    }
    return result;
  }, [candidates, filters]);

  const metrics = useMemo(() => {
    const counts = { total: candidates.length, reviewed: 0, shortlisted: 0, pending: 0 };
    candidates.forEach(c => {
      if (c.reviewStatus === 'Shortlisted') counts.shortlisted++;
      else if (c.reviewStatus === 'Reviewed') counts.reviewed++;
      else counts.pending++;
    });
    counts.reviewed += counts.shortlisted; 
    return counts;
  }, [candidates]);

  const toggleCompare = (id) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(compareId => compareId !== id) : prev.length < 3 ? [...prev, id] : prev);
  };

  return { candidates: filteredCandidates, metrics, filters, setFilters, selectedId, setSelectedId, updateCandidateScore, compareIds, toggleCompare, rawCandidates: candidates };
};