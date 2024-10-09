/* import CalendarButton from "./CalendarButton"; */
import { Box, Typography } from "@mui/joy";
import ThemeToggleButton from "./ThemeButton";

const GraphHeader = () => {
    return (
        <Box
        sx={{
          display: 'flex',
          width: '100%', // `w-full`
          justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          my: 3, // `my-3` (вертикальные отступы по 12px сверху и снизу)
        }}
      >
        <Typography
          level="h2" // Используем `variant` для управляемого размера шрифта
          sx={{
            fontSize: {
              xs: '1.125rem', // `text-lg`
              sm: '1.25rem',  // `text-xl`
              md: '1.25rem',  // `text-xl`
              lg: '1.5rem',   // `text-2xl`
              xl: '1.875rem', // `text-3xl`
              '2xl': '1.875rem', // `text-3xl`
            },
            fontWeight: 'bold',
            px: 2, // `px-2` (горизонтальные отступы по 8px)
          }}
        >
          Token Inference Valuation Index
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3, // Между элементами `gap-3` соответствует 12px
          }}
        >
          {/* <CalendarButton /> */}
          <ThemeToggleButton />
        </Box>
      </Box>
    )
}

export default GraphHeader;