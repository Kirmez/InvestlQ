"use client";

import Header from "./components/Header";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who are already using our service.
          </p>
          
        </div>
      </div>
    </main>
  );
}