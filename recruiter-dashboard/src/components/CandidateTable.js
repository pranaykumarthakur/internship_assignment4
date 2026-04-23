import React from 'react';
import { Search } from 'lucide-react';
import { getPriorityStatus } from '../utils/engine';

const CandidateTable = ({ candidates, searchTerm, setSearchTerm, selectedId, setSelectedId, compareIds, toggleCompare }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-3">
        <Search size={18} className="text-gray-400" />
        <input 
          type="text" 
          placeholder="Search candidates by name..." 
          className="bg-transparent border-none outline-none w-full text-sm focus:ring-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Content */}
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-500 sticky top-0 z-10 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Compare</th>
              <th className="px-6 py-3 font-medium">Candidate</th>
              <th className="px-6 py-3 font-medium text-center">Score</th>
              <th className="px-6 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {candidates.map(cand => {
              const statusStyle = getPriorityStatus(cand.finalScore).styles;
              const isSelected = selectedId === cand.id;
              
              return (
                <tr 
                  key={cand.id} 
                  onClick={() => setSelectedId(cand.id)}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${isSelected ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={compareIds.includes(cand.id)}
                      onChange={() => toggleCompare(cand.id)}
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{cand.name}</td>
                  <td className="px-6 py-4 font-black text-center text-gray-700">{cand.finalScore}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${statusStyle}`}>
                      {cand.status.split('-')[0].trim()}
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