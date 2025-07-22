'use client'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Header } from '@/widgets/header/Header'
import theme from '@/theme/theme'
import { ThemeProvider } from '@emotion/react'
import { auth } from '@/firebase/firebaseConfig'
import useAuthStore from '@/features/auth/model/useAuthStore'
export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { setUser } = useAuthStore()

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			if (!currentUser) return
			console.log(currentUser)
			setUser(currentUser)
		})
	}, [])
	return (
		<ThemeProvider theme={theme}>
			<Header />
			{children}
		</ThemeProvider>
	)
}
