import React from 'react';
import { getPriorityStatus } from '../utils/engine';

const DetailPanel = ({ candidate, updateScore }) => {
  if (!candidate) return (
    <div className="h-full bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400">
      Select a candidate to evaluate
    </div>
  );

  const status = getPriorityStatus(candidate.finalScore);

  const metricsConfig = [
    { key: 'assignment', label: 'Assignment Code', weight: '30%' },
    { key: 'video', label: 'Video Demo', weight: '25%' },
    { key: 'ats', label: 'ATS Resume Score', weight: '20%' },
    { key: 'github', label: 'GitHub Profile', weight: '15%' },
    { key: 'communication', label: 'Communication', weight: '10%' }
  ];

  return (
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-gray-900">{candidate.name}</h2>
            <p className="text-sm text-gray-500 font-medium">{candidate.id} • {candidate.role}</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black text-gray-900">{candidate.finalScore}</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold border ${status.styles}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Adjust Evaluations</h3>
        
        {metricsConfig.map(({ key, label, weight }) => (
          <div key={key} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-gray-700">{label} <span className="text-gray-400 font-normal">({weight})</span></span>
              <span className="font-black text-blue-600">{candidate.scores[key]}/100</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={candidate.scores[key]}
              onChange={(e) => updateScore(candidate.id, key, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPanel;