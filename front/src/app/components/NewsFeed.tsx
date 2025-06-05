"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const allNews = [
  { title: "Bitcoin alcanza los $75K", text: "Los mercados reaccionan positivamente tras la aprobación de nuevos ETFs." },
  { title: "FED mantiene tasas", text: "La Reserva Federal decide mantener las tasas de interés sin cambios." },
  { title: "Ethereum 2.0 avanza", text: "Se completó con éxito una nueva fase de actualización en la red de Ethereum." },
  { title: "Nuevo impuesto cripto en Europa", text: "La UE propone medidas para regular y gravar activos digitales." },
  { title: "China impulsa el yuan digital", text: "El banco central de China anuncia pruebas masivas con su moneda digital." },
  { title: "El oro supera los $2.200", text: "La incertidumbre global lleva al oro a máximos históricos." },
  { title: "Solana se dispara", text: "SOL sube un 30% tras integración con importantes exchanges." },
  { title: "Google lanza IA financiera", text: "Google presenta una IA enfocada en predicción de mercados." },
];

export default function NewsFeed() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % allNews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentNews = allNews[index];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-full overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Noticias</h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold text-gray-700">{currentNews.title}</h3>
          <p className="text-gray-600">{currentNews.text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
