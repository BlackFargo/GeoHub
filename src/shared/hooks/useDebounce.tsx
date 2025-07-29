import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, ms: number) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		let timeout = setTimeout(() => {
			setDebouncedValue(value)
		}, ms)
		return () => clearTimeout(timeout)
	}, [value, ms])

	return { debouncedValue }
}
