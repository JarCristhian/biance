import { create } from "zustand";
import dayjs from "dayjs";

interface GlobalState {
    refreshFinance: boolean;
    daySelected: string;
    setRefreshFinance: () => void;
    setDaySelected: (state: string) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    refreshFinance: false,
    daySelected: dayjs().format("YYYY-MM-DD"),
    setRefreshFinance: () => set((prev) => ({ refreshFinance: !prev.refreshFinance })),
    setDaySelected: (state: string) => set({ daySelected: state }),
}));
