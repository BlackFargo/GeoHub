import { NextResponse } from 'next/server'
import { z } from 'zod'
import axios from 'axios'
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
		const wikiSearch = await axios.get(
			`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
				parsed.data.q
			)}&format=json&origin=*`
		)
		const wikiData = wikiSearch.data

		const countryInfo = await axios.get(
			`https://restcountries.com/v3.1/name/${parsed.data.q}?fields=name,capital,flags,population,region,subregion,languages,currencies,borders,area`
		)
		const country = countryInfo.data[0]

		const firstWikiResult = wikiData?.query?.search?.[0]

		if (!firstWikiResult) {
			return NextResponse.json({ error: 'No results found' }, { status: 404 })
		}

		const pageId = firstWikiResult.pageid

		// 2️⃣ Получаем краткий текст статьи, изображение и ссылку
		const pageRes = await axios.get(
			`https://en.wikipedia.org/w/api.php?action=query&pageids=${pageId}&prop=extracts|pageimages|info&exintro=true&explaintext=true&format=json&origin=*`
		)
		const pageData = pageRes.data

		const page = pageData?.query?.pages?.[pageId]

		if (!page) {
			return NextResponse.json(
				{ error: 'Page data not found' },
				{ status: 404 }
			)
		}

		const wikiCountry = {
			title: page.title,
			extract: page.extract, // краткий текст статьиь
			thumbnail: page.thumbnail?.source || null, // изображение, если ест
			fullurl: page.fullurl, // ссылка на страницу
			countryInfo: country,
		}

		return NextResponse.json(wikiCountry)
	} catch (err: unknown) {
		return NextResponse.json(
			{ error: err instanceof Error ? err.message : 'Unknown error' },
			{ status: 500 }
		)
	}
}
