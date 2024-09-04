import { create } from 'zustand';

interface ThemeState {
    isDark: boolean;
    toggleTheme: () => void;
}

const useThemeStore = create<ThemeState>()((set) => ({
    isDark: false, // Default theme is light
    toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useThemeStore;