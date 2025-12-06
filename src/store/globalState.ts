import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    refreshFinance: false,
    refreshCategory: false,
    setRefreshFinance: (state: boolean) => set({ refreshFinance: state }),
    setRefreshCategory: (state: boolean) => set({ refreshCategory: state }),
}))
