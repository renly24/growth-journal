import { JournalEntry } from '@/types';

const generateReflectionPrompt = (entries: JournalEntry[]) => {
  return `
以下の日記エントリーを分析し、ユーザーの成長や変化についての洞察を提供してください。
各エントリーは「幸せ」「学び」「挑戦」の3つのカテゴリで構成されています。

エントリー:
${entries.map(entry => `
日付: ${entry.date}
幸せ: ${entry.happiness}
学び: ${entry.learning}
挑戦: ${entry.challenge}
${entry.freeNote ? `自由記述: ${entry.freeNote}` : ''}
`).join('\n')}

以下の点について分析してください：
1. 最近の傾向や変化
2. 特に注目すべき成長や進歩
3. 次のステップへの提案

回答は日本語で、親しみやすく励ましの言葉を含めてください。
`;
};

export const generateAIFeedback = async (entries: JournalEntry[]) => {
  try {
    // TODO: Ollama APIを使用してAIフィードバックを生成
    const prompt = generateReflectionPrompt(entries);
    // 実際のAPI呼び出しは実装が必要
    return {
      content: "最近の記録を見ると、挑戦する姿勢が増えてきていますね！特に〇〇の分野での成長が目立ちます。次は△△に挑戦してみるのはいかがでしょうか？",
      type: 'reflection' as const,
    };
  } catch (error) {
    console.error('Error generating AI feedback:', error);
    throw error;
  }
}; 