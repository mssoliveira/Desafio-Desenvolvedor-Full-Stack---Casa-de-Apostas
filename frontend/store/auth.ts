import { Session } from 'next-auth';
import { create } from 'zustand';

export interface UserProps extends Session {
	userId: string;
}

type AuthStore = {
	user: any | null;
	token: string;
	saveUser: (user: any) => void;
	clearUser: () => void;
	saveToken: (token: string) => void;
	clearToken: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	token: '',
	saveUser: (user) => set({ user }),
	clearUser: () => set({ user: null }),
	saveToken: (token) => set({ token }),
	clearToken: () => set({ token: '' }),
}));
