import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const store = (set) => ({
  userName: '',
  updateUserName: (username) => set(() => ({ userName: username })),
  surveyTitle: '',
  updateSurveyTitle: (title) => set(() => ({ surveyTitle: title })),
});

export const usePlayerStore = create(persist(store, { name: 'store' }));
