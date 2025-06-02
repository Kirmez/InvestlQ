/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';

interface Props {
  userId: number;
  onTransactionComplete: () => void;
}

export default function BuySellInvestiqStock({ userId, onTransactionComplete }: Props) {
  const [amount, setAmount] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (type: "buy" | "sell") => {
    const quantity = parseFloat(amount);
    if (amount.trim() === '' || isNaN(quantity) || quantity <= 0) {
      setError('Ingresa una cantidad válida.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}/cartera/accion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idActivo: 1, 
          tipo: type,
          cantidad: quantity,
          precioCompra: 100
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      onTransactionComplete();
      setAmount('');
    } catch (err: any) {
      console.error('Error en transacción:', err);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 mt-6 rounded-lg shadow-md text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Trade InvestIQ</h2>

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

      <div className="mt-4 space-x-4">
        <button
          onClick={() => handleAction("buy")}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Buy'}
        </button>
        <button
          onClick={() => handleAction("sell")}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'Sell'}
        </button>
      </div>
    </div>
  );
}
