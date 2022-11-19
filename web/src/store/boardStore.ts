import { ColumnType } from 'types/ziele'
import create from 'zustand'

interface BoardStore {
  columns: ColumnType[]
  filteredColumns: ColumnType[]

  setColumns: (columns: ColumnType[]) => void
  filterCardsByText: (searchTerm: string) => void
  filterCardsByTags: (tags: string[]) => void
  clearFilters: () => void
}

const useBoardStore = create<BoardStore>((set) => ({
  columns: [],
  searchTerm: '',
  filteredColumns: [],

  setColumns: (columns) => set({ columns, filteredColumns: columns }),

  filterCardsByText: (searchTerm) =>
    set((state) => ({
      filteredColumns: state.columns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.title.toLowerCase().includes(searchTerm.toLowerCase())),
      })),
    })),

  filterCardsByTags: (tags) =>
    set((state) => ({
      filteredColumns: state.columns.map((column) => ({
        ...column,
        cards: column.cards.filter((card) => card.tags.some((tag) => tags.includes(tag.body))),
      })),
    })),

  clearFilters: () => set((state) => ({ filteredColumns: state.columns })),
}))

export { useBoardStore }
