import { create } from 'zustand';
import { ThemeSlice, createThemeSlice } from './slices/theme.slice';

export const useStore = create<ThemeSlice>()(
  (...a) => ({
    ...createThemeSlice(...a),
  })
);
