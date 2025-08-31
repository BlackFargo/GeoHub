import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					maxWidth: '1340px',
					paddingTop: '20px', // кастомный верхний padding
					paddingBottom: '20px', // кастомный нижний padding
					paddingLeft: '20px', // кастомный левый
					paddingRight: '20px', // кастомный правый
				},
			},
		},
	},
})

export default theme
