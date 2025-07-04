import { create } from 'zustand';
import { IUser } from '@/types/user.types';

interface AuthStore {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setLoading: (loading: boolean) => void;
}

const useAuth = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ isLoading: loading })
}));

export default useAuth;