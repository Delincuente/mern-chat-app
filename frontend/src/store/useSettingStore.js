import { create } from "zustand";

export const useSettingStore = create((set) => ({
    theme: localStorage.getItem("theme") || "coffee",
    setTheme: async (theme) => {
        localStorage.setItem("theme", theme);
        set({ theme });
    },
}));