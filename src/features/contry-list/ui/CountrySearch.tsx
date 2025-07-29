import { TextField } from '@mui/material'
import { InputAdornment } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
export function CountrySearch({ searchCountry }) {
	return (
		<TextField
			variant='outlined'
			fullWidth
			onChange={searchCountry}
			InputProps={{
				startAdornment: (
					<InputAdornment position='start'>
						<SearchOutlined />
					</InputAdornment>
				),
			}}
		></TextField>
	)
}
