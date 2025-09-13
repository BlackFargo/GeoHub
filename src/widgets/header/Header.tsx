'use client'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'

import Brightness4Icon from '@mui/icons-material/Brightness4'
import IconButton from '@mui/material/IconButton'

import Link from 'next/link'
import { User } from 'firebase/auth'

export function Header({ user }: { user: User | null }) {
	return (
		<AppBar position='fixed'>
			<Toolbar>
				<Typography
					variant='h4'
					component={Link}
					sx={{ flexGrow: 1 }}
					href={'/'}
				>
					GeoHub
				</Typography>
				<IconButton
					color='inherit'
					// onClick={toggleTheme}
					aria-label='Переключить тему'
				>
					<Brightness4Icon />
				</IconButton>
				{user ? (
					<Button
						color='inherit'
						component={Link}
						href='/profile'
						startIcon={<AccountCircle />}
						aria-label='Профіль користувача'
						sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: '16px' }}
					>
						{user.displayName}
					</Button>
				) : (
					<Button
						color='inherit'
						startIcon={<AccountCircle />}
						component={Link}
						href='/auth'
					>
						Увійти
					</Button>
				)}
				{/* <IconButton color='inherit'>
					<SettingsIcon />
				</IconButton>
				<Button color='inherit' startIcon={<HelpOutlineIcon />}>
					Поддержка
				</Button>
				<IconButton color='inherit'>
					<Badge badgeContent={3} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<IconButton color='inherit'>
					<SearchIcon />
				</IconButton> */}
			</Toolbar>
		</AppBar>
	)
}
