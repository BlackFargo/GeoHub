import { Container, Grid, TextField, Typography } from '@mui/material'

import { InputAdornment } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
export default function Home() {
	return (
		<>
			<Container sx={{ pt: '200px' }}>
				<Typography variant='h4'>Пошук інформації про країни</Typography>
				<TextField
					variant='outlined'
					fullWidth
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchOutlined />
							</InputAdornment>
						),
					}}
				></TextField>
				<Grid></Grid>
			</Container>
		</>
	)
}
