import { NextResponse } from 'next/server'
import { z } from 'zod'

const querySchema = z.object({
	q: z.string().min(1),
})

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const parsed = querySchema.safeParse({
		q: searchParams.get('q'),
	})

	if (!parsed.success) {
		return NextResponse.json(
			{ error: 'Invalid query parameter' },
			{ status: 400 }
		)
	}

	const { q } = parsed.data

	const response = await fetch(
		`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(q)}&format=json&origin=*`
	)
	const data = await response.json()

	return NextResponse.json(data)
}
