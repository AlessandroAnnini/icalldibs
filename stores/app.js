import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

let store = (set) => ({
  isLoading: false,
  userId: null,
  isAdmin: false,
  setIsLoading: (isLoading) => set(() => ({ isLoading })),
  setUserId: (userId) => set(() => ({ userId })),
  setIsAdmin: (isAdmin) => set(() => ({ isAdmin })),
});

// if (process.env.NODE_ENV === 'development') {
//   store = devtools(store);
// }

store = persist(store, { name: 'app' });

export const useAppStore = create(store);
