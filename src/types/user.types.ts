export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?: 'credentials' | 'google' | 'github' | 'facebook' | 'twitter' | 'apple' | 'LinkedIn';
  role?: 'admin' | 'user';
  isVerified?: boolean;
  twoFactorEnabled?: boolean;
  acceptedTermsAndConditions?: boolean;
  subscribeNewsletter?: boolean;
  verifyToken?: string;
  verifyTokenExpire?: Date;
  resetToken?: string;
  resetTokenExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
