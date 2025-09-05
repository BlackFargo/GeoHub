import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1976d2',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					maxWidth: '1340px',
					paddingTop: '20px',
					paddingBottom: '20px',
					paddingLeft: '20px',
					paddingRight: '20px',
				},
			},
		},
	},
})

export default theme
