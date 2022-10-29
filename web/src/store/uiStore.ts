import create from 'zustand'

interface UiStore {
  isSidebarOpen: boolean
  isCreateIssueModalOpen: boolean
  clickedColumnId: string | null

  toggleSidebar: (value: boolean) => void
  toggleCreateIssueModal: (value: boolean) => void
  setClickedColumnId: (value: string | null) => void
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  isCreateIssueModalOpen: false,
  clickedColumnId: null,

  setClickedColumnId: (value) => set({ clickedColumnId: value }),
  toggleSidebar: (value) => set((state) => ({ isSidebarOpen: value })),
  toggleCreateIssueModal: (value) => set((state) => ({ isCreateIssueModalOpen: value })),
}))

export { useUiStore }
