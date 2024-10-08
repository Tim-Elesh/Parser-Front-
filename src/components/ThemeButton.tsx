import IconButton from '@mui/joy/IconButton';
import { useColorScheme } from '@mui/joy/styles';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

const ThemeToggleButton = () => {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      variant="solid"
      sx={{
        bgcolor: 'primary.400',
        '&:hover': {
          backgroundColor: 'primary.500',
        },
        color: 'white',
        transition: '0.2s',
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
