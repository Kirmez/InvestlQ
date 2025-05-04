"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-blue-600">
            InvestQL
          </Link>
        
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">
            Log out
          </Link>
          
        </div>
      </nav>
    </header>
  );
}
