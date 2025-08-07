'use client'
import { List, ListItem, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import resNotFound from '@/shared/assets/images/resultNotFound.png'
import { Box } from '@mui/material'
import NotFoundBlock from './NotFoundBlock'

export function SelectCountryList({ countries }) {
	return (
		<Grid container spacing={2} component={'ul'} sx={{ marginTop: '20px' }}>
			{countries?.length ? (
				countries.map(contry => (
					<Grid
						key={contry.name.official}
						size={{ xs: 12, md: 6, lg: 4 }}
						component={'li'}
						sx={{
							padding: '10px',
							border: '2px solid gray',
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<img src={contry?.flags.png} width={200} height={200} />
						<List sx={{ padding: '0' }}>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='h4'>
									{' '}
									Країна: {contry.name.common}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='h6' component={'p'}>
									Регіон: {contry.region}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='body1' component={'p'}>
									Популяція: {contry.population}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='body1' component={'p'}>
									Столиця: {contry.capital}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='body1' component={'p'}>
									Мови:{' '}
									{Object.values(contry.languages)
										.map(language => language)
										.join(', ')}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='body1' component={'p'}>
									{/* Валюта: {Object.values(contry.currencies)[0].name} */}
								</Typography>
							</ListItem>
							<ListItem sx={{ padding: '0' }}>
								<Typography variant='body1' component={'p'}>
									Область: {contry.area}км²
								</Typography>
							</ListItem>
						</List>
					</Grid>
				))
			) : (
				<NotFoundBlock />
			)}
		</Grid>
	)
}
