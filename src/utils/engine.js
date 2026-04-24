export const calculateFinalScore = (scores) => {
  const final = (
    (scores.assignment * 0.30) +
    (scores.video * 0.25) +
    (scores.ats * 0.20) +
    (scores.github * 0.15) +
    (scores.communication * 0.10)
  );
  return Math.round(final);
};

export const getPriorityStatus = (score) => {
  if (score >= 90) return { label: 'P0 - Interview', styles: 'bg-green-100 text-green-800 border-green-300' };
  if (score >= 80) return { label: 'P1 - Strong', styles: 'bg-yellow-100 text-yellow-800 border-yellow-300' };
  if (score >= 70) return { label: 'P2 - Borderline', styles: 'bg-orange-100 text-orange-800 border-orange-300' };
  return { label: 'P3 - Reject', styles: 'bg-red-100 text-red-800 border-red-300' };
};