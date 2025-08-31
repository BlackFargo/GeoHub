'use client'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import MuiThemeRegistry from '@/theme/muiThemeRegistry'

export default function ClientProviders({
	children,
}: {
	children: React.ReactNode
}) {
	const [queryClient] = useState(() => new QueryClient())

	return (
		<QueryClientProvider client={queryClient}>
			{/* <MuiThemeRegistry>{children}</MuiThemeRegistry> */}
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
