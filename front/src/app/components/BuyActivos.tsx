/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

interface Activo {
  id: number;
  nombre: string;
}

interface Props {
  userId: number;
  onTransactionComplete: () => void;
}

export default function BuyActivos({ userId, onTransactionComplete }: Props) {
  const [activos, setActivos] = useState<Activo[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [amount, setAmount] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/activos')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: Activo[]) => {
        setActivos(data);
        if (data.length > 0) setSelectedId(data[0].id);
      })
      .catch((err) => {
        console.error('Error fetching activos:', err);
        setError('No se pudieron cargar activos.');
      });
  }, []);

  const handleBuy = async () => {
    const quantity = parseFloat(amount);
    if (amount.trim() === '' || isNaN(quantity) || quantity <= 0) {
      setError('Ingresa una cantidad válida.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const randomPrice = parseFloat((50 + Math.random() * 50).toFixed(2));
      const response = await fetch(`http://localhost:8080/api/users/${userId}/cartera/accion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idActivo: selectedId,
          tipo: 'buy',
          cantidad: quantity,
          precioCompra: randomPrice
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `HTTP ${response.status}`);
      }

      onTransactionComplete();
      setAmount('');
    } catch (err: any) {
      console.error('Error comprando activo:', err);
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Buy Activo</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <select
        className="w-full p-2 border border-gray-300 rounded mb-2 text-black"
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
      >
        {activos.map((a) => (
          <option key={a.id} value={a.id}>{a.nombre}</option>
        ))}
      </select>

      <input
        type="text"
        inputMode="decimal"
        className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
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
        onClick={handleBuy}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Procesando...' : 'Buy'}
      </button>
    </div>
  );
}
