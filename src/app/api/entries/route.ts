import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import Entry from '@/models/Entry';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: '認証が必要です' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectToDatabase();
    const entries = await Entry.find()
      .sort({ createdAt: -1 })
      .lean();

    // 日付を文字列に変換
    const formattedEntries = entries.map(entry => ({
      ...entry,
      createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : null,
      updatedAt: entry.updatedAt ? new Date(entry.updatedAt).toISOString() : null,
    }));

    return NextResponse.json(formattedEntries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    return new NextResponse(
      JSON.stringify({ error: '記録の取得に失敗しました', details: error instanceof Error ? error.message : '不明なエラー' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse(JSON.stringify({ error: '認証が必要です' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { happiness, learning, challenge, freeNote } = body;

    await connectToDatabase();
    const entry = await Entry.create({
      happiness,
      learning,
      challenge,
      freeNote,
      userId: session.user.id,
    });

    // 日付を文字列に変換
    const formattedEntry = {
      ...entry.toObject(),
      createdAt: entry.createdAt ? new Date(entry.createdAt).toISOString() : null,
      updatedAt: entry.updatedAt ? new Date(entry.updatedAt).toISOString() : null,
    };

    return NextResponse.json(formattedEntry);
  } catch (error) {
    console.error('Error creating entry:', error);
    return new NextResponse(
      JSON.stringify({ error: '記録の保存に失敗しました', details: error instanceof Error ? error.message : '不明なエラー' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 