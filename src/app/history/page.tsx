'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { SparklesIcon, AcademicCapIcon, RocketLaunchIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Entry {
  _id: string;
  happiness: string;
  learning: string;
  challenge: string;
  freeNote: string;
  createdAt: string;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (status === 'authenticated') {
      const fetchEntries = async () => {
        try {
          const response = await fetch('/api/entries', {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          if (!response.ok) {
            const errorData: ErrorResponse = await response.json();
            throw new Error(errorData.error || '記録の取得に失敗しました');
          }
          const data = await response.json();
          setEntries(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : '記録の取得に失敗しました');
          console.error('Error fetching entries:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchEntries();
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-purple-800">読み込み中...</p>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="text-center text-red-600">
              <p className="text-lg font-semibold mb-2">エラーが発生しました</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-2 drop-shadow-sm">
            成長記録の履歴
          </h1>
        </div>

        <div className="space-y-8">
          {entries.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-lg p-8 text-center text-gray-600">
              <p>まだ記録がありません</p>
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry._id} className="bg-white py-8 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-right text-sm text-gray-500 mb-4">
                  {entry.createdAt ? (
                    format(new Date(entry.createdAt), 'yyyy年MM月dd日 HH:mm', { locale: ja })
                  ) : (
                    '日付不明'
                  )}
                </div>

                {entry.happiness && (
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <SparklesIcon className="text-yellow-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
                      <h3 className="text-lg font-semibold text-gray-800">Today's Happiness</h3>
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.happiness}</p>
                  </div>
                )}

                {entry.learning && (
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <AcademicCapIcon className="text-blue-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
                      <h3 className="text-lg font-semibold text-gray-800">Today's Learning</h3>
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.learning}</p>
                  </div>
                )}

                {entry.challenge && (
                  <div className="mb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <RocketLaunchIcon className="text-purple-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
                      <h3 className="text-lg font-semibold text-gray-800">Today's Challenge</h3>
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.challenge}</p>
                  </div>
                )}

                {entry.freeNote && (
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <PencilSquareIcon className="text-green-500 flex-shrink-0 pt-0.5" style={{ width: '14px', height: '14px' }} />
                      <h3 className="text-lg font-semibold text-gray-800">Free Note</h3>
                    </div>
                    <p className="text-gray-600 whitespace-pre-wrap">{entry.freeNote}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 