"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import ActivosPerformance from "./components/ActivosPerformance";
import InvestiqChart from "./components/InvestiqChart";
import UserPortfolio from "./components/UserPortfolio";
import BuyActivos from "./components/BuyActivos";
import BuySellInvestiqStock from "./components/BuySellInvestiqStock";
import { useRouter } from "next/navigation"; 

interface LoggedInUser {
  idUsuario: number;
  nombre: string;
  email: string;
}

export default function Page() {
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("loggedInUser");
    if (userFromStorage) {
      setLoggedInUser(JSON.parse(userFromStorage));
    }
  }, []);

  const [reloadTrigger, setReloadTrigger] = useState<number>(0);
  const handleTransactionComplete = () => {
    setReloadTrigger((prev) => prev + 1);
  };

  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    } else {
      router.push("/login"); 
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
      <Header />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">

          <div className="lg:col-span-1 flex flex-col h-full space-y-6">
            <NewsFeed />
            <ActivosPerformance />
          </div>

          <div className="lg:col-span-2 space-y-6">
            {loggedInUser && (
              <>
                <InvestiqChart
                />
                <BuySellInvestiqStock
                  userId={loggedInUser.idUsuario}
                  onTransactionComplete={handleTransactionComplete}
                />
              </>
            )}
          </div>

          <div className="lg:col-span-1 flex flex-col h-full space-y-6">
            {loggedInUser && (
              <>
                <UserPortfolio
                  userId={loggedInUser.idUsuario}
                  reloadTrigger={reloadTrigger}
                />
                <BuyActivos
                  userId={loggedInUser.idUsuario}
                  onTransactionComplete={handleTransactionComplete}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
