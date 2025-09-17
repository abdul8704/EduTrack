import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export const UserProgressChartJS = ({ history, title = 'Progress Over Time', height = 140 }) => {
  if (!history || history.length === 0) return null;
  const sorted = [...history].sort((a, b) => new Date(a.date) - new Date(b.date));
  // Format date as 'DD-MMM' (e.g., 18-Sep)
  const labels = sorted.map(entry => {
    const d = new Date(entry.date);
    return d.toLocaleString('en-GB', { day: '2-digit', month: 'short' }).replace(' ', '-');
  });
  const data = sorted.map(entry => entry.percent);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: false,
        borderColor: '#2563eb',
        backgroundColor: '#2563eb',
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      x: {
        title: { display: false },
        ticks: {
          color: '#6b7280',
          font: { size: 10 },
          callback: function(value, index, values) {
            // Show every label if few, else skip some to avoid crowding
            const total = values.length;
            if (total > 8 && index % Math.ceil(total / 8) !== 0) return '';
            return this.getLabelForValue(value);
          }
        },
        grid: { color: '#e5e7eb' },
      },
      y: {
        min: 0,
        max: 100,
        title: { display: false },
        ticks: { color: '#6b7280', font: { size: 11 }, stepSize: 20 },
        grid: { color: '#e5e7eb' },
      },
    },
  };

  return (
    <div style={{ width: '100%', minWidth: 260, height }}>
      <div className="text-xs" style={{ color: '#6b7280', marginBottom: '0.25rem' }}>{title}</div>
      <Line data={chartData} options={options} height={height} />
    </div>
  );
};
