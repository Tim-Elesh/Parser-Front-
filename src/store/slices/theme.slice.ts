import { StateCreator } from 'zustand';

type Theme = 'dark' | 'light';

export type ThemeSlice = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [],
  [],
  ThemeSlice
> = (set) => ({
  theme: 'light',
  setTheme: (theme) => {
    document.documentElement.setAttribute('color-scheme', theme);
    set({ theme });
  },
});
