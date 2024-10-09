import React, { useState } from 'react';
import { Button, Box } from '@mui/joy';
import CheckIcon from '@mui/icons-material/Check';
import { useColorScheme } from '@mui/joy/styles';

interface ColumnVisibilityToggleProps {
  columns: Array<{ id: string; label: string }>;
  hiddenColumns: string[];
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>;
}

const ColumnVisibilityToggle: React.FC<ColumnVisibilityToggleProps> = ({ columns, hiddenColumns, setHiddenColumns }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const toggleColumnVisibility = (accessor: string) => {
    setHiddenColumns((prevHiddenColumns) =>
      prevHiddenColumns.includes(accessor)
        ? prevHiddenColumns.filter((column) => column !== accessor)
        : [...prevHiddenColumns, accessor]
    );
  };

  const  palette  = useColorScheme();
  const isDarkMode = palette?.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Button
        onClick={() => setIsPopupVisible(!isPopupVisible)}
        sx={{
          fontSize: '1rem', // 'md' в Tailwind соответствует 1rem
          paddingX: '16px', // 'px-4' в Tailwind равно 16px (4 * 4px)
          paddingY: '8px',  // 'py-2' в Tailwind равно 8px (2 * 4px)
          borderRadius: '4px', // 'rounded' в Tailwind соответствует 0.25rem или 4px
          backgroundColor: 'blue.500',
          color: 'white',
          '&:hover': {
            backgroundColor: 'blue.600',
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          transitionDuration: '200ms', // 'duration-200' в Tailwind равна 200 миллисекундам
        }}
      >
        Visibility
      </Button>
      {isPopupVisible && (
        <Box
          sx={{
            position: 'absolute',
            marginTop: '8px',
            padding: '24px',
            bgcolor: isDarkMode ? 'black' : 'white',
            border: '1px solid',
            boxShadow: 4,
            zIndex: 10,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {columns.map((column) => (
              <Button
                key={column.id}
                onClick={() => toggleColumnVisibility(column.id)}
                sx={{
                  opacity: hiddenColumns.includes(column.id) ? 0.5 : 1, // Установить opacity для скрытых колонок
                  fontSize: '0.875rem',    // 'text-sm' в Tailwind обычно равен 0.875rem
                  paddingX: '8px',         // 'px-2' в Tailwind равен 8px (2 * 4px)
                  paddingY: '4px',         // 'py-1' в Tailwind равен 4px (1 * 4px)
                  borderRadius: '4px',     // 'rounded' в Tailwind равен 4px или 0.25rem
                  backgroundColor: 'grey.200', // 'bg-gray-200' в Tailwind
                  '&:hover': {
                    backgroundColor: 'grey.300', // 'hover:bg-gray-300' в Tailwind
                  },
                }}
              >
                {hiddenColumns.includes(column.id) ?
                  <>
                    {column.label}
                  </>
                  :
                  <>
                    <CheckIcon /> {column.label}
                  </>
                }
              </Button>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ColumnVisibilityToggle;