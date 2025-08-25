// /theme/MuiThemeRegistry.tsx
import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { clientSideEmotionCache } from '@/shared/utils/create-emotion-cache'
import theme from './theme'

export default function MuiThemeRegistry({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<CacheProvider value={clientSideEmotionCache}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</CacheProvider>
	)
}
