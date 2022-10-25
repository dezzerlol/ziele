import create from 'zustand'

interface UiStore {
  isSidebarOpen: boolean
  isCreateIssueModalOpen: boolean
  toggleSidebar: (value: boolean) => void
  toggleCreateIssueModal: (value: boolean) => void
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  isCreateIssueModalOpen: false,

  toggleSidebar: (value) => set((state) => ({ isSidebarOpen: value })),
  toggleCreateIssueModal: (value) => set((state) => ({ isCreateIssueModalOpen: value })),
}))

export { useUiStore }
