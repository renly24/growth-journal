export type JournalEntry = {
  id: string;
  userId: string;
  date: Date;
  happiness: string;
  learning: string;
  challenge: string;
  freeNote?: string;
  aiFeedback?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
};

export type AIFeedback = {
  id: string;
  userId: string;
  entryId: string;
  content: string;
  type: 'reflection' | 'suggestion' | 'encouragement';
  createdAt: Date;
}; 