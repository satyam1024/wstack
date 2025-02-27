import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserState = {
  user: { id: string; name: string; email: string } | null
  setUser: (user: UserState['user']) => void
  clearUser: () => void
}

export const useUserStore = create<UserState>()(
  // This is the `persist` middleware that stores the user in LocalStorage
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store', // LocalStorage key
    },
  ),
)
