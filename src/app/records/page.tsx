'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { SparklesIcon, AcademicCapIcon, RocketLaunchIcon, PencilSquareIcon } from '@heroicons/react/20/solid';

export default function RecordsPage() {
  const [entry, setEntry] = useState({
    happiness: '',
    learning: '',
    challenge: '',
    freeNote: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });

      if (!response.ok) {
        throw new Error('Failed to save entry');
      }

      const data = await response.json();
      console.log('Entry saved:', data);
      
      setEntry({
        happiness: '',
        learning: '',
        challenge: '',
        freeNote: '',
      });
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 drop-shadow-sm">
            Today's Growth Record
          </h1>
          <p className="text-lg text-purple-600">
            {format(new Date(), 'MMMM dd, yyyy')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white py-8 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <SparklesIcon className="text-yellow-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
              <label className="text-lg font-semibold text-gray-800">
                Today's Happiness
              </label>
            </div>
            <textarea
              className="w-full p-4 rounded-full focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all resize-none bg-gray-50/50 backdrop-blur-sm mb-2"
              rows={3}
              value={entry.happiness}
              onChange={(e) => setEntry({ ...entry, happiness: e.target.value })}
              placeholder="Record what made you happy today"
            />
            <div className="text-right text-xs text-gray-500">
              {entry.happiness.length}/500
            </div>
          </div>

          <div className="bg-white py-8 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow mt-8">
            <div className="flex items-center gap-4 mb-4">
              <AcademicCapIcon className="text-blue-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
              <label className="text-lg font-semibold text-gray-800">
                Today's Learning
              </label>
            </div>
            <textarea
              className="w-full p-4 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none bg-gray-50/50 backdrop-blur-sm mb-2"
              rows={3}
              value={entry.learning}
              onChange={(e) => setEntry({ ...entry, learning: e.target.value })}
              placeholder="Record what you learned today"
            />
            <div className="text-right text-xs text-gray-500">
              {entry.learning.length}/500
            </div>
          </div>

          <div className="bg-white py-8 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow mt-8">
            <div className="flex items-center gap-4 mb-4">
              <RocketLaunchIcon className="text-purple-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
              <label className="text-lg font-semibold text-gray-800">
                Today's Challenge
              </label>
            </div>
            <textarea
              className="w-full p-4 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none bg-gray-50/50 backdrop-blur-sm mb-2"
              rows={3}
              value={entry.challenge}
              onChange={(e) => setEntry({ ...entry, challenge: e.target.value })}
              placeholder="Record a challenge you took on today"
            />
            <div className="text-right text-xs text-gray-500">
              {entry.challenge.length}/500
            </div>
          </div>

          <div className="bg-white py-8 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow mt-8">
            <div className="flex items-center gap-4 mb-4">
              <PencilSquareIcon className="text-green-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
              <label className="text-lg font-semibold text-gray-800">
                Free Note
              </label>
            </div>
            <textarea
              className="w-full p-4 rounded-full focus:ring-2 focus:ring-green-500 focus:focus:ring-green-500 transition-all resize-none bg-gray-50/50 backdrop-blur-sm mb-2"
              rows={3}
              value={entry.freeNote}
              onChange={(e) => setEntry({ ...entry, freeNote: e.target.value })}
              placeholder="Write anything else you want to record"
            />
            <div className="text-right text-xs text-gray-500">
              {entry.freeNote.length}/500
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-4 px-6 rounded-xl text-lg font-semibold hover:from-pink-500 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!entry.happiness && !entry.learning && !entry.challenge && !entry.freeNote}
          >
            Save Record
          </button>
        </form>
      </div>
    </main>
  );
} 