import React from 'react';
import { useCandidates } from './hooks/useCandidates';
import MetricsCards from './components/MetricsCards';
import CandidateTable from './components/CandidateTable';
import DetailPanel from './components/DetailPanel';
import CompareView from './components/CompareView';

function App() {
  const { 
    candidates, metrics, searchTerm, setSearchTerm, 
    selectedId, setSelectedId, updateCandidateScore, 
    compareIds, toggleCompare, rawCandidates 
  } = useCandidates();

  // Get full objects for the selected candidate and compared candidates
  const selectedCandidate = rawCandidates.find(c => c.id === selectedId);
  const compareCandidates = rawCandidates.filter(c => compareIds.includes(c.id));

  return (
    <div className="h-screen flex flex-col bg-slate-50 p-6 overflow-hidden">
      
      {/* Simple Header inside App.js to save files */}
      <header className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Conversly.ai <span className="text-blue-600 font-light">Recruiter Hub</span></h1>
        <p className="text-sm text-gray-500">Live evaluation priority engine</p>
      </header>

      {/* Metrics Row */}
      <MetricsCards metrics={metrics} />

      {/* Main Workspace Split */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left Column: List (Takes up 5 columns) */}
        <div className="col-span-5 h-full">
          <CandidateTable 
            candidates={candidates}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            compareIds={compareIds}
            toggleCompare={toggleCompare}
          />
        </div>

        {/* Right Column: Dynamic Editor or Comparison (Takes up 7 columns) */}
        <div className="col-span-7 h-full">
          {compareIds.length > 0 ? (
            <CompareView candidates={compareCandidates} />
          ) : (
            <DetailPanel 
              candidate={selectedCandidate} 
              updateScore={updateCandidateScore} 
            />
          )}
        </div>
        
      </div>
    </div>
  );
}

export default App;