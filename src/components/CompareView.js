import React from 'react';

const CompareView = ({ candidates }) => {
  if (candidates.length === 0) return null;

  const metricsList = ['assignment', 'video', 'ats', 'github', 'communication'];

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-x-auto">
      <h2 className="text-xl font-black text-gray-900 mb-6">Candidate Comparison</h2>
      <div className="flex gap-4">
        {candidates.map(cand => (
          <div key={cand.id} className="flex-1 border border-gray-200 rounded-xl p-4 bg-gray-50">
            <h3 className="font-bold text-lg">{cand.name}</h3>
            <p className="text-3xl font-black text-gray-900 my-2">{cand.finalScore}</p>
            <div className="space-y-3 mt-4">
              {metricsList.map(metric => (
                <div key={metric} className="text-sm">
                  <div className="text-gray-500 capitalize">{metric}</div>
                  <div className="font-semibold text-gray-900">{cand.scores[metric]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompareView;