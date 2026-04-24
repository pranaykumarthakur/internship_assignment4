import React, { useState } from 'react';
import { getPriorityStatus } from '../utils/engine';

const DetailPanel = ({ candidate, updateScore }) => {
  // Local state to make the dropdowns interactive
  const [subScores, setSubScores] = useState({
    ui: 'Good', state: 'Good', structure: 'Good', edge: 'Good'
  });

  if (!candidate) return (
    <div className="h-full bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="bg-white p-4 rounded-full shadow-sm mb-3">
        <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
      </div>
      <p className="font-medium text-sm">Select a candidate to begin evaluation</p>
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

  const microCriteria = [
    { id: 'ui', label: 'UI Quality' },
    { id: 'state', label: 'State Handling' },
    { id: 'structure', label: 'Component Structure' },
    { id: 'edge', label: 'Edge Cases' }
  ];

  return (
    <div className="h-full bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
      
      <div className="p-6 bg-gradient-to-br from-slate-50 to-white border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{candidate.name}</h2>
            <p className="text-sm text-slate-500 font-medium mt-1">{candidate.id} • {candidate.reviewStatus}</p>
          </div>
          <div className="text-right">
            <p className="text-5xl font-black text-slate-900 tracking-tighter drop-shadow-sm">{candidate.finalScore}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${status.styles}`}>
              {status.label}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto space-y-7">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
          Adjust Master Evaluations
          <div className="h-px bg-slate-100 flex-1"></div>
        </h3>
        
        {metricsConfig.map(({ key, label, weight }) => (
          <div key={key} className="space-y-3 group">
            <div className="flex justify-between text-sm items-end">
              <span className="font-bold text-slate-700">{label} <span className="text-slate-400 font-medium ml-1 text-xs">({weight})</span></span>
              <span className="font-black text-blue-600 text-lg tabular-nums">{candidate.scores[key]}</span>
            </div>
            <div className="relative pt-1">
              <input 
                type="range" 
                min="0" max="100" 
                value={candidate.scores[key]}
                onChange={(e) => updateScore(candidate.id, key, e.target.value)}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all focus:outline-none"
              />
            </div>
          </div>
        ))}

        {/* Interactive Micro Evaluations */}
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-8 mb-4 flex items-center gap-2">
          Assignment Sub-Criteria (PDF Req)
          <div className="h-px bg-slate-100 flex-1"></div>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {microCriteria.map(criteria => (
            <div key={criteria.id} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <label className="block text-xs font-bold text-slate-600 mb-1">{criteria.label}</label>
              <select 
                value={subScores[criteria.id]}
                onChange={(e) => setSubScores({...subScores, [criteria.id]: e.target.value})}
                className="w-full bg-white border border-slate-200 text-sm rounded-lg p-1.5 outline-none focus:border-blue-400 cursor-pointer"
              >
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Average">Average</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetailPanel;