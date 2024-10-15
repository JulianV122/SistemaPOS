import { create } from 'zustand';

type User = {
    id: string;
    email: string;
    lastname: string;
    name: string;
    telephone: string;
}

type UserSessionStore = {
    user: User | null;
    setUser: (user: User) => void;
    clear: () => void;
}

export const useUserSession = create<UserSessionStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clear: () => set({ user: null }),
}));