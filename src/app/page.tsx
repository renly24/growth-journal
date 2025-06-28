'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-purple-800">
              Growth Journal
            </h1>
            {session ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <UserCircleIcon className="w-6 h-6 text-purple-600" />
                  <span className="text-gray-700">{session.user?.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/records"
              className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-3xl hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                Today's Record
              </h2>
              <p className="text-gray-600">
                Record your daily growth and achievements
              </p>
            </Link>

            <Link
              href="/history"
              className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-3xl hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-purple-800 mb-2">
                History
              </h2>
              <p className="text-gray-600">
                View your past records and track your progress
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 