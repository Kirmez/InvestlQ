/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Props {
  userId: number;
  onTransactionComplete: () => void;
}

export default function InvestiqChart({ userId, onTransactionComplete }: Props) {
  const [data, setData] = useState<{ name: string; price: number }[]>([]);
  const [amount, setAmount] = useState<string>('');     
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startPrice = 100;
    const points = Array.from({ length: 15 }, (_, i) => ({
      name: `Day ${i + 1}`,
      price: parseFloat((startPrice + i * 10 + Math.random() * 20).toFixed(2)),
    }));
    setData(points);
  }, []);

  const handleBuyInvestiq = async () => {
    const quantity = parseFloat(amount);
    if (amount.trim() === '' || isNaN(quantity) || quantity <= 0) {
      setError('Ingresa una cantidad válida.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const ultimoPrecio = data.length > 0 ? data[data.length - 1].price : 100;
      const response = await fetch(`http://localhost:8080/api/users/${userId}/cartera/accion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idActivo: 1,      
          tipo: 'buy',
          cantidad: quantity,
          precioCompra: ultimoPrecio
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      onTransactionComplete();
      setAmount('');
    } catch (err: any) {
      console.error('Error comprando InvestIQ:', err);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">INVESTIQ Stock Performance</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 text-center">
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          inputMode="decimal"
          className="border border-gray-300 px-4 py-2 rounded w-32 text-center text-black"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;
            if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
              setAmount(val);
            }
          }}
        />
        <button
          onClick={handleBuyInvestiq}
          disabled={loading}
          className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Buy InvestIQ'}
        </button>
      </div>
    </div>
  );
}
