'use client'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Header } from '@/widgets/header/Header'
import theme from '@/theme/theme'
import { ThemeProvider } from '@emotion/react'
import { auth } from '@/firebase/firebaseConfig'
import useAuthStore from '@/features/auth/model/useAuthStore'
import { useMemo } from 'react'
import { createTheme } from '@mui/material'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { setUser } = useAuthStore()
	const [mode, setMode] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			if (!currentUser) return
			console.log(currentUser)
			setUser(currentUser)
		})
	}, [])
	const queryClient = new QueryClient()
	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					primary: {
						main: mode === 'light' ? '#1976d2' : '#90caf9',
					},
					secondary: {
						main: mode === 'light' ? '#dc004e' : '#f48fb1',
					},
				},
			}),
		[mode]
	)
	const toggleTheme = () =>
		setMode(prev => (prev === 'light' ? 'dark' : 'light'))
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<Header toggleTheme={toggleTheme} currentMode={mode} />
				{children}
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
