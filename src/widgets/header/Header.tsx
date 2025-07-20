import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import IconButton from '@mui/material/IconButton'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Badge from '@mui/material/Badge'
import SearchIcon from '@mui/icons-material/Search'

export function Header() {
	return (
		<AppBar position='fixed'>
			<Toolbar>
				<Typography variant='h4' component='h1' sx={{ flexGrow: 1 }}>
					GeoHub
				</Typography>
				<IconButton color='inherit'>
					<Brightness4Icon />
				</IconButton>

				<Button color='inherit' startIcon={<AccountCircle />}>
					Увійти
				</Button>

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
