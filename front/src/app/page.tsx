"use client";

import Header from "./components/Header";
import NewsFeed from "./components/NewsFeed";
import UserPortfolio from "./components/UserPortfolio";
import InvestiqChart from "./components/InvestiqChart";

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 to-white">
      <Header />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <NewsFeed />
          </div>

          <div className="lg:col-span-2">
            <InvestiqChart />
          </div>

          <div className="lg:col-span-1 h-100">
            <UserPortfolio />
          </div>
        </div>
      </div>
    </main>
  );
}
