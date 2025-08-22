'use client'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Header } from '@/widgets/header/Header'

import { auth } from '@/firebase/firebaseConfig'
import useAuthStore from '@/features/auth/model/useAuthStore'
import AppProviders from './providers/AppProviders'
import { useState } from 'react'

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
		<AppProviders>
			<Header />
			{children}
		</AppProviders>
	)
}
