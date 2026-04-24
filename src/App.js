import React from 'react';
import { useCandidates } from './hooks/useCandidates';
import MetricsCards from './components/MetricsCards';
import CandidateTable from './components/CandidateTable';
import DetailPanel from './components/DetailPanel';
import CompareView from './components/CompareView';

function App() {
  const { 
    candidates, metrics, filters, setFilters, 
    selectedId, setSelectedId, updateCandidateScore, 
    compareIds, toggleCompare, rawCandidates 
  } = useCandidates();

  const selectedCandidate = rawCandidates.find(c => c.id === selectedId);
  const compareCandidates = rawCandidates.filter(c => compareIds.includes(c.id));

  return (
    <div className="h-screen flex flex-col bg-slate-50 p-6 overflow-hidden">
      <header className="mb-6 flex-shrink-0">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Conversly.ai <span className="text-blue-600 font-light">Recruiter Hub</span></h1>
        <p className="text-sm text-slate-500 font-medium">Live evaluation priority engine</p>
      </header>

      <div className="flex-shrink-0">
        <MetricsCards metrics={metrics} />
      </div>

      {/* STRICT FLEXBOX CONTAINER TO FORCE SCROLLING */}
      <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        <div className="col-span-6 lg:col-span-7 h-full flex flex-col min-h-0">
          <CandidateTable 
            candidates={candidates}
            filters={filters}
            setFilters={setFilters}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            compareIds={compareIds}
            toggleCompare={toggleCompare}
          />
        </div>

        <div className="col-span-6 lg:col-span-5 h-full flex flex-col min-h-0">
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