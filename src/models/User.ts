import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '名前を入力してください'],
  },
  email: {
    type: String,
    required: [true, 'メールアドレスを入力してください'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'パスワードを入力してください'],
    select: false,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,
});

// パスワードのハッシュ化
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    console.log('Hashing password...');
    console.log('Original password:', this.password);
    
    // パスワードが既にハッシュ化されている場合はスキップ
    if (this.password.startsWith('$2')) {
      console.log('Password is already hashed');
      return next();
    }

    // パスワードをハッシュ化
    const salt = await bcrypt.genSalt(10);
    console.log('Generated salt:', salt);
    this.password = await bcrypt.hash(this.password, salt);
    console.log('Hashed password:', this.password);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error as Error);
  }
});

// パスワードの検証
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  try {
    console.log('Comparing passwords...');
    console.log('Password field exists:', !!this.password);
    console.log('Password field type:', typeof this.password);
    
    if (!this.password) {
      console.error('No password hash found in user document');
      return false;
    }

    console.log('Stored password hash:', this.password);
    console.log('Candidate password:', candidatePassword);

    // パスワードの比較
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw error;
  }
};

export default mongoose.models.User || mongoose.model('User', userSchema); 