import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  ids: string[]
  toggle: (id: string) => void
  isFav: (id: string) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set(s => ({ ids: s.ids.includes(id) ? s.ids.filter(i => i !== id) : [...s.ids, id] })),
      isFav: (id) => get().ids.includes(id),
    }),
    { name: 'foodiex-favs' }
  )
)
