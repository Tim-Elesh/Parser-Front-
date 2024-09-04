import  useThemeStore  from '../store/themeStore';

export const useTheme = () => {
    const { isDark, toggleTheme } = useThemeStore();
    return { isDark, toggleTheme };
};