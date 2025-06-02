'use client';

import { useEffect, useState } from 'react';

interface ActivoPnl {
  id: number;
  nombre: string;
  pnl: number;
}

export default function ActivosPerformance() {
  const [activos, setActivos] = useState<ActivoPnl[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/activos/pnl')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: ActivoPnl[]) => {
        setActivos(data);
      })
      .catch(err => {
        console.error('Error fetching PnL:', err);
        setError('Error cargando desempeño.');
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!error && (
        <ul>
          {activos.map((a) => (
            <li
              key={a.id}
              className={`flex justify-between py-1 text-sm font-medium ${
                a.pnl >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span>{a.nombre}</span>
              <span>{a.pnl > 0 ? '+' : ''}{a.pnl.toFixed(2)}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
