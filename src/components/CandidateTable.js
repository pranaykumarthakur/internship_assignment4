import React from 'react';
import { Search } from 'lucide-react';
import { getPriorityStatus } from '../utils/engine';

const CandidateTable = ({ candidates, filters, setFilters, selectedId, setSelectedId, compareIds, toggleCompare }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
      
      {/* Restored Advanced Interactive Toolbar */}
      <div className="p-5 border-b border-gray-100 bg-white flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-[200px] bg-slate-50 px-4 py-2.5 border border-slate-200 rounded-xl transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder="Search candidates by name or college..." 
            className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder-slate-400"
            value={filters?.search || ''}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
        </div>

        <div className="flex gap-3 text-sm">
          <select 
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-medium cursor-pointer transition-all"
            value={filters?.sortBy || 'priority'} 
            onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          >
            <option value="priority">Sort: Priority Score</option>
            <option value="assignment">Sort: Assignment Score</option>
          </select>
          <select 
            className="bg-slate-50 border border-slate-200 text-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 font-medium cursor-pointer transition-all"
            value={filters?.status || 'All'} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
          </select>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-y-auto flex-1 relative">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="backdrop-blur-md bg-white/80 text-slate-500 sticky top-0 z-10 text-xs uppercase font-bold tracking-wider shadow-sm">
            <tr>
              <th className="px-6 py-4">Compare</th>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4 text-center">Assign</th>
              <th className="px-6 py-4 text-center">Video</th>
              <th className="px-6 py-4 text-center">ATS</th>
              <th className="px-6 py-4">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {candidates.map(cand => {
              const priorityObj = getPriorityStatus(cand.finalScore);
              const isSelected = selectedId === cand.id;
              
              return (
                <tr 
                  key={cand.id} 
                  onClick={() => setSelectedId(cand.id)}
                  className={`cursor-pointer transition-all duration-200 group
                    ${isSelected ? 'bg-blue-50/80 border-l-4 border-l-blue-500' : 'hover:bg-slate-50 border-l-4 border-l-transparent'}
                  `}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer transition-transform hover:scale-110"
                      checked={compareIds.includes(cand.id)}
                      onChange={() => toggleCompare(cand.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{cand.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{cand.college || "Christ University"}</div>
                  </td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">{cand.scores.assignment}</td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">{cand.scores.video}</td>
                  <td className="px-6 py-4 text-center font-semibold text-slate-700">{cand.scores.ats}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <span className="font-black text-slate-900 w-6">{cand.finalScore}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${priorityObj.styles}`}>
                      {priorityObj.label.split('-')[0].trim()}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateTable;