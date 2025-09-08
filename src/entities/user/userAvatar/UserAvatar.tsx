import React from 'react'
import Image from 'next/image'
export default function UserAvatar({ src }: { src?: string }) {
	return (
		<Image
			src={src || '/path/to/image.jpg'}
			width={100}
			height={100}
			alt='User Avatar'
		/>
	)
}
