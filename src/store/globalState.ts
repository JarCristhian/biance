import { create } from "zustand";
import dayjs from "dayjs";
import { GetCategory } from "@/app/home/interfaces";

interface GlobalState {
    refreshFinance: boolean;
    daySelected: string;
    categories: GetCategory[];
    setRefreshFinance: () => void;
    setDaySelected: (state: string) => void;
    setCategories: (state: GetCategory[]) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
    refreshFinance: false,
    daySelected: dayjs().format("YYYY-MM-DD"),
    categories: [],
    setRefreshFinance: () => set((prev) => ({ refreshFinance: !prev.refreshFinance })),
    setDaySelected: (state: string) => set({ daySelected: state }),
    setCategories: (state: GetCategory[]) => set({ categories: state }),
}));
