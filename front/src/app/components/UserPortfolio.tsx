import { useEffect, useState } from "react";

interface CarteraItem {
  carteraId: number;
  nombreActivo: string;
  cantidad: number;
  precioCompra: number;
  fechaCompra: string;
}

export default function UserPortfolio() {
  const [cartera, setCartera] = useState<CarteraItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users/999/cartera")
      .then((res) => res.json())
      .then(setCartera)
      .catch((err) => console.error("Error loading portfolio:", err));
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        User Portfolio
      </h2>
      {cartera.length === 0 ? (
        <p className="text-gray-500">No assets in portfolio.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Activo
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Cantidad
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Precio Compra
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                Fecha
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {cartera.map((item) => (
              <tr key={item.carteraId}>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.nombreActivo}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.cantidad}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  ${item.precioCompra.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {new Date(item.fechaCompra).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
