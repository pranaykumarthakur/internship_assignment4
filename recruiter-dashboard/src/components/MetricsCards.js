import React from 'react';
import { Users, CheckCircle, AlertCircle, XCircle, Clock } from 'lucide-react';

const MetricsCards = ({ metrics }) => {
  const cards = [
    { label: 'Total Reviewed', value: metrics.total, icon: <Users size={20}/>, color: 'text-gray-600' },
    { label: 'P0 (Immediate)', value: metrics.P0, icon: <CheckCircle size={20}/>, color: 'text-green-600' },
    { label: 'P1 (Strong)', value: metrics.P1, icon: <CheckCircle size={20}/>, color: 'text-blue-600' },
    { label: 'P2 (Borderline)', value: metrics.P2, icon: <Clock size={20}/>, color: 'text-yellow-600' },
    { label: 'P3 (Reject)', value: metrics.P3, icon: <XCircle size={20}/>, color: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{card.label}</p>
            <p className={`text-2xl font-black mt-1 ${card.color}`}>{card.value}</p>
          </div>
          <div className={`${card.color} opacity-80`}>{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;