import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

const store = (set) => ({
  userName: '',
  updateUserName: (username) => set(() => ({ userName: username })),
});

export const usePlayerStore = create(store);
