import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'

export default function AuthToggle() {
	const [isRegister, setIsRegister] = useState(false)

	return (
		<Box
			onClick={() => setIsRegister(!isRegister)}
			sx={{
				width: 120,
				height: 40,
				borderRadius: 20,
				backgroundColor: '#eee',
				cursor: 'pointer',
				position: 'relative',
				userSelect: 'none',
			}}
		>
			<Box
				sx={{
					position: 'absolute',
					top: 2,
					left: isRegister ? 62 : 2,
					width: 56,
					height: 36,
					borderRadius: 20,
					backgroundColor: '#1976d2',
					transition: 'left 0.3s ease',
				}}
			/>
			<Typography
				sx={{
					position: 'absolute',
					top: '50%',
					left: 12,
					transform: 'translateY(-50%)',
					color: isRegister ? '#999' : '#fff',
					fontWeight: 'bold',
					pointerEvents: 'none',
					userSelect: 'none',
				}}
			>
				Вхід
			</Typography>
			<Typography
				sx={{
					position: 'absolute',
					top: '50%',
					right: 12,
					transform: 'translateY(-50%)',
					color: isRegister ? '#fff' : '#999',
					fontWeight: 'bold',
					pointerEvents: 'none',
					userSelect: 'none',
				}}
			>
				Реєстрація
			</Typography>
		</Box>
	)
}
