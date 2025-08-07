import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import resNotFound from '@/shared/assets/images/resultNotFound.png'

const NotFoundBlock = () => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			justifyContent='center'
			textAlign='center'
			margin='0 auto'
			minHeight='60vh'
			px={2}
		>
			<Image
				src={resNotFound}
				alt='country is not found'
				width={300}
				height={300}
				style={{ marginBottom: 24 }}
			/>

			<Typography variant='h4' fontWeight={500} gutterBottom>
				Країна не знайдена
			</Typography>

			<Typography variant='body1' color='text.secondary'>
				Спробуйте змінити запит або перевірити правильність написання.
			</Typography>
		</Box>
	)
}

export default NotFoundBlock
