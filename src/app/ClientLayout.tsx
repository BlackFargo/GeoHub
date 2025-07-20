'use client'
import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { Header } from '@/widgets/header/Header'

export default function ClientLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			{children}
		</>
	)
}
