import { Box, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

export function AuthForm() {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<FormData>()

	const onSubmit = data => {
		console.log(data)
	}

	return (
		<Box
			component='form'
			noValidate
			sx={{
				paddingTop: 10,
				maxWidth: 400,
				mx: 'auto',
				mt: 4,
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
			}}
		>
			<TextField
				label='Email'
				variant='outlined'
				// {...register('email')}
				// error={!!errors.email}
				// helperText={errors.email?.message}
				fullWidth
			/>

			<TextField
				label='Пароль'
				variant='outlined'
				type='password'
				// {...register('password')}
				// error={!!errors.password}
				// helperText={errors.password?.message}
				fullWidth
			/>
		</Box>
	)
}
