import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    console.log('Registering new user:', { name, email, password });

    if (!name || !email || !password) {
      return new NextResponse(
        JSON.stringify({ error: '名前、メールアドレス、パスワードは必須です' }),
        { status: 400 }
      );
    }

    await connectToDatabase();

    // メールアドレスの重複チェック
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists:', email);
      return new NextResponse(
        JSON.stringify({ error: 'このメールアドレスは既に登録されています' }),
        { status: 400 }
      );
    }

    // ユーザーの作成（パスワードはUserモデルのpre('save')フックでハッシュ化されます）
    const user = await User.create({
      name,
      email,
      password, // パスワードはUserモデルのpre('save')フックでハッシュ化されます
    });

    console.log('User created successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return new NextResponse(
      JSON.stringify({ error: 'ユーザー登録に失敗しました' }),
      { status: 500 }
    );
  }
} 