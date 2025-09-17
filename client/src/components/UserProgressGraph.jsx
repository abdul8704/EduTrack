import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const UserProgressGraph = ({ history }) => {
  if (!history || history.length === 0) return null;
  // Ensure chronological order and map to chart-friendly structure
  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
  const data = sorted.map(entry => ({
    date: new Date(entry.date).toLocaleDateString(),
    percent: entry.percent,
  }));
  return (
    <div className="w-full mt-2 select-none" onClick={(e) => e.stopPropagation()}>
      <div className="text-xs text-gray-500 mb-1">Progress Over Time</div>
      <div className="w-full min-w-[260px] h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={10} tick={{ fill: '#888' }} interval="preserveStartEnd" minTickGap={12} />
            <YAxis domain={[0, 100]} fontSize={10} tick={{ fill: '#888' }} allowDecimals={false} />
            <Tooltip formatter={(v) => `${v}%`} />
            <Line type="monotone" dataKey="percent" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
