'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

export default function InvestiqChart() {
  const [data, setData] = useState<{ name: string; price: number }[]>([]);

  useEffect(() => {
    const startPrice = 100;
    const points = Array.from({ length: 15 }, (_, i) => ({
      name: `Day ${i + 1}`,
      price: parseFloat((startPrice + i * 10 + Math.random() * 20).toFixed(2)),
    }));
    setData(points);
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">
        INVESTIQ Stock Performance
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
