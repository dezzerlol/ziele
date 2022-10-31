import create from 'zustand'

interface UiStore {
  isSidebarOpen: boolean
  isCreateIssueModalOpen: boolean
  isInviteUserModalOpen: boolean
  clickedColumnId: string | null

  toggleSidebar: (value: boolean) => void
  toggleCreateIssueModal: (value: boolean) => void
  toggleInviteUserModal: (value: boolean) => void
  setClickedColumnId: (value: string | null) => void
}

const useUiStore = create<UiStore>((set) => ({
  isSidebarOpen: false,
  isCreateIssueModalOpen: false,
  isInviteUserModalOpen: false,
  clickedColumnId: null,

  setClickedColumnId: (value) => set({ clickedColumnId: value }),
  toggleSidebar: (value) => set((state) => ({ isSidebarOpen: value })),
  toggleInviteUserModal: (value) => set((state) => ({ isInviteUserModalOpen: value })),
  toggleCreateIssueModal: (value) => set((state) => ({ isCreateIssueModalOpen: value })),
}))

export { useUiStore }
