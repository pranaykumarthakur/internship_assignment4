import React from 'react';
import { Users, FileCheck, Award, Clock } from 'lucide-react';

const MetricsCards = ({ metrics }) => {
  const cards = [
    { label: 'Total Candidates', value: metrics.total, icon: <Users size={22}/>, color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
    { label: 'Reviewed', value: metrics.reviewed, icon: <FileCheck size={22}/>, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' },
    { label: 'Shortlisted', value: metrics.shortlisted, icon: <Award size={22}/>, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { label: 'Pending', value: metrics.pending, icon: <Clock size={22}/>, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
  ];

  return (
    <div className="grid grid-cols-4 gap-5 mb-6 animate-fade-in">
      {cards.map((card, i) => (
        <div 
          key={i} 
          className={`relative overflow-hidden bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-default`}
        >
          <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 ${card.bg}`}></div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
            <p className={`text-3xl font-black mt-1.5 ${card.color} drop-shadow-sm`}>{card.value}</p>
          </div>
          <div className={`relative z-10 p-3 rounded-xl ${card.bg} ${card.color} ${card.border} border`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;