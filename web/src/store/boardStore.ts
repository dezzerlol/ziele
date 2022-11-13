import { ColumnType } from 'types/ziele'
import create from 'zustand'

interface BoardStore {
  columns: ColumnType[]
  filteredColumns: ColumnType[]

  setColumns: (columns: ColumnType[]) => void
  filterCardsByText: (searchTerm: string) => void
  filterCardsByTag: (tag: string) => void
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

  filterCardsByTag: (tag) => set((state) => ({})),
}))

export { useBoardStore }
