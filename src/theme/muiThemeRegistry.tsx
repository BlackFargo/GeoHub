'use client'
import * as React from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createCache from '@emotion/cache'
import theme from './theme'

const clientSideEmotionCache: EmotionCache = createCache({
	key: 'css',
	prepend: true,
})

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
