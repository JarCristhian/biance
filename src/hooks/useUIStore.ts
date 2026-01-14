import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PrimaryColor = 'default' | 'cyan' | 'green' | 'blue' | 'yellow' | 'violet' | 'pink' | 'orange';

interface UIStore {
    sidebarOpen: boolean
    isCollapsed: boolean
    primaryColor: PrimaryColor
    toggleSidebar: () => void
    closeSidebar: () => void
    openSidebar: () => void
    toggleCollapse: () => void
    setPrimaryColor: (color: PrimaryColor) => void
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            sidebarOpen: false,
            primaryColor: 'default',
            isCollapsed: false,
            toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
            closeSidebar: () => set({ sidebarOpen: false }),
            openSidebar: () => set({ sidebarOpen: true }),
            toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
            setPrimaryColor: (color) => set({ primaryColor: color }),
        }),
        {
            name: 'ui-storage',
        }
    )
)
