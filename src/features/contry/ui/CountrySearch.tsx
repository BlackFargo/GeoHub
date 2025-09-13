import { TextField } from '@mui/material'
import { InputAdornment } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
export function CountrySearch({
	searchCountry,
}: {
	searchCountry: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<TextField
			data-testid='country-search'
			placeholder='Search country...'
			variant='outlined'
			fullWidth
			onChange={e => searchCountry(e)}
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
