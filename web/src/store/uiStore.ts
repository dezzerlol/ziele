import create from 'zustand'

interface UiStore {
  isSidebarOpen: boolean
  toggleSidebar: (value: boolean) => void
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,

  toggleSidebar: (value) => set((state) => ({ isSidebarOpen: value })),
}))

export { useUiStore }
