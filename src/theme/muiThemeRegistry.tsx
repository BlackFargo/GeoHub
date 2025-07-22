'use client'

import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createEmotionCache } from '@/shared/utils/create-emotion-cache'
import theme from './theme'

const clientSideEmotionCache = createEmotionCache()

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
