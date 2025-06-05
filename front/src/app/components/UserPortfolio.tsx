'use client';

import { useEffect, useState } from "react";

interface CarteraItem {
  carteraId: number;
  nombreActivo: string;
  cantidad: number;
  precioCompra: number;
  fechaCompra: string;
}

interface Props {
  userId: number;
  reloadTrigger: number;
}

export default function UserPortfolio({ userId, reloadTrigger }: Props) {
  const [cartera, setCartera] = useState<CarteraItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCartera = () => {
    setLoading(true);
    fetch(`http://localhost:8080/api/users/${userId}/cartera`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: CarteraItem[]) => {
        setCartera(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Error loading portfolio:", err);
        setError("Error cargando cartera.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (userId) {
      fetchCartera();
    }
  }, [userId, reloadTrigger]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mi Portfolio</h2>

      {loading && <p className="text-gray-500">Cargando cartera...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && cartera.length === 0 && (
        <p className="text-gray-500">No assets in portfolio.</p>
      )}

      {!loading && !error && cartera.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Activo</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cantidad</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Precio Compra</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Fecha</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {cartera.map((item) => (
                <tr key={item.carteraId}>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.nombreActivo}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{item.cantidad}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">${item.precioCompra.toFixed(2)}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {new Date(item.fechaCompra).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
