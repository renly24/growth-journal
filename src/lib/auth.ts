import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from './mongodb';
import User from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'メールアドレス', type: 'email' },
        password: { label: 'パスワード', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('メールアドレスとパスワードを入力してください');
        }

        console.log('Attempting to authenticate user:', credentials.email);
        await connectToDatabase();

        const user = await User.findOne({ email: credentials.email }).select('+password');
        console.log('User found:', user ? 'Yes' : 'No');
        console.log('User document:', user ? JSON.stringify(user.toObject(), null, 2) : 'Not found');

        if (!user) {
          console.log('User not found:', credentials.email);
          throw new Error('ユーザーが見つかりません');
        }

        console.log('User found, comparing passwords...');
        try {
          if (!user.password) {
            console.error('Password field is missing from user document');
            throw new Error('認証情報が正しくありません');
          }

          const isPasswordValid = await user.comparePassword(credentials.password);
          console.log('Password validation result:', isPasswordValid);

          if (!isPasswordValid) {
            throw new Error('パスワードが正しくありません');
          }

          user.lastLoginAt = new Date();
          await user.save();
          console.log('Login successful for user:', credentials.email);

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30日
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 