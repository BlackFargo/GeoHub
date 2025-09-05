import { screen, render } from '@testing-library/react'
import { SelectCountryList } from '../ui/SelectCountryList'

jest.mock('react-virtuoso', () => ({
	VirtuosoGrid: ({ itemContent, totalCount }: any) => (
		<div>
			{Array.from({ length: totalCount }).map((_, i) => (
				<div key={i}>{itemContent(i)}</div>
			))}
		</div>
	),
}))

const countriesMock = [
	{
		name: {
			common: 'Jamaica',
			official: 'Jamaica',
			nativeName: { eng: { official: 'Jamaica', common: 'Jamaica' } },
		},
		flags: {
			png: 'https://flagcdn.com/w320/jm.png',
			svg: 'https://flagcdn.com/jm.svg',
			alt: 'The flag of Jamaica is divided by a gold diagonal … and black on the hoist and fly sides',
		},
		region: 'Americas',
		subregion: 'Caribbean',
		population: 2961161,
		capital: ['Kingston'],
		languages: { eng: 'English', jam: 'Jamaican Patois' },
		currencies: { JMD: { name: 'Jamaican dollar', symbol: '$' } },
		area: 10991,
		borders: [],
	},
]

describe('SelectCountryList', () => {
	it('renders country list', () => {
		render(<SelectCountryList countries={countriesMock} isLoading={false} />)

		expect(screen.getByText('Jamaica')).toBeInTheDocument()
		expect(screen.getByText('Region: Americas')).toBeInTheDocument()
		expect(screen.getByText('Population: 2961161')).toBeInTheDocument()
		expect(screen.getByText('Capital: Kingston')).toBeInTheDocument()
		expect(
			screen.getByText('Languages: English, Jamaican Patois')
		).toBeInTheDocument()
		expect(screen.getByText('Area: 10991 km²')).toBeInTheDocument()
	})
})
