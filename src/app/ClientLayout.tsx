'use client'
import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Header } from '@/widgets/header/Header'

import { auth } from '@/firebase/firebaseConfig'
import useAuthStore from '@/features/auth/model/useAuthStore'
import AppProviders from './providers/AppProviders'
import Footer from '@/widgets/footer/Footer'
import { useCountryList } from '@/features/contry/model/useCountry'
import { getLikedCountries } from '@/entities/country/api/getLikedCountries'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const { setUser, user } = useAuthStore()
	const { setLikedCountries } = useCountryList()

	useEffect(() => {
		onAuthStateChanged(auth, currentUser => {
			if (!currentUser) return

			setUser(currentUser)

			getLikedCountries().then(likedCountries => {
				setLikedCountries({ countries: likedCountries[0].countries })
			})
		})
	}, [])

	return (
		<AppProviders>
			<Header user={user} />
			{children}
			<Footer />
		</AppProviders>
	)
}
