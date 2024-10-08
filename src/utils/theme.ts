import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: '#1976d2', // основной цвет светлой темы
        },
        background: {
          body: '#ffffff',
        },
        text: {
          primary: '#000000',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          500: '#1976d2', // основной цвет темной темы
        },
        background: {
          body: '#121212',
        },
        text: {
          primary: '#ffffff',
        },
      },
    },
  },
});

export default theme;