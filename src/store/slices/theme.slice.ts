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
> = (set) => {
  const savedTheme = localStorage.getItem('theme') as Theme; // Check localStorage for saved theme
  const initialTheme: Theme = savedTheme || 'light'; // Default to 'light' if none found

  return {
    theme: initialTheme,
    setTheme: (theme) => {
      document.documentElement.setAttribute('color-scheme', theme);
      localStorage.setItem('theme', theme); // Save theme to localStorage
      set({ theme });
    },
  };
};
