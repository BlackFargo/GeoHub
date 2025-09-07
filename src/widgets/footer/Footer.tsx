import { Box } from '@mui/material'

export default function Footer() {
	return (
		<Box
			component='footer'
			sx={theme => ({
				p: 2,
				color: '#fff',
				mt: 'auto',
				backgroundColor: theme.palette.primary.main, // берем цвет из темы
				textAlign: 'center',
			})}
		>
			<p>© 2025 GeoHub. All rights reserved.</p>
		</Box>
	)
}
