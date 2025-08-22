import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CacheProvider } from '@emotion/react'
import { clientSideEmotionCache } from '@/shared/utils/create-emotion-cache'

export default function AppProviders({ children }: React.PropsWithChildren) {
	const queryClient = new QueryClient()
	return (
		<CacheProvider value={clientSideEmotionCache}>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</CacheProvider>
	)
}
