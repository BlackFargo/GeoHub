import { NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
	q: z.string().min(2).max(100),
})

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)

	const q = searchParams.get('q')

	const parsed = schema.safeParse({ q })
	if (!parsed.success) {
		return NextResponse.json(
			{ error: 'Invalid query parameter "q"' },
			{ status: 400 }
		)
	}
	try {
		const searchRes = await fetch(
			`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
				q
			)}&format=json&origin=*`
		)
		const searchData = await searchRes.json()

		const firstResult = searchData?.query?.search?.[0]

		if (!firstResult) {
			return NextResponse.json({ error: 'No results found' }, { status: 404 })
		}

		const pageId = firstResult.pageid

		// 2️⃣ Получаем краткий текст статьи, изображение и ссылку
		const pageRes = await fetch(
			`https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts|pageimages|info&exintro=true&explaintext=true&format=json&origin=*`
		)
		const pageData = await pageRes.json()

		const page = pageData?.query?.pages?.[pageId]

		if (!page) {
			return NextResponse.json(
				{ error: 'Page data not found' },
				{ status: 404 }
			)
		}

		const wikiCountry = {
			title: page.title,
			extract: page.extract, // краткий текст статьи
			thumbnail: page.thumbnail?.source || null, // изображение, если есть
			fullurl: page.fullurl, // ссылка на страницу
		}

		return NextResponse.json(wikiCountry)
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 }
		)
	}
}
