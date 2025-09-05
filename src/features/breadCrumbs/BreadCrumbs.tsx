import React from 'react'
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

interface BreadcrumbItem {
	label: string
	href?: string
}

interface BreadcrumbsProps {
	items: BreadcrumbItem[]
	props?: React.ComponentProps<typeof MUIBreadcrumbs>
	sx?: React.CSSProperties
}

const StyledBreadcrumbs = styled(MUIBreadcrumbs)(({ theme }) => ({
	'& .MuiBreadcrumbs-separator': {
		margin: '0 8px',
		color: theme.palette.text.secondary,
	},
	'& a': {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}))

export default function Breadcrumbs({ items, ...props }: BreadcrumbsProps) {
	return (
		<StyledBreadcrumbs
			separator={<NavigateNextIcon fontSize='small' />}
			aria-label='breadcrumb'
			{...props}
			sx={props.sx}
		>
			{items.map((item, index) =>
				item.href ? (
					<Link key={index} href={item.href}>
						{item.label}
					</Link>
				) : (
					<Typography key={index} color='textPrimary'>
						{item.label}
					</Typography>
				)
			)}
		</StyledBreadcrumbs>
	)
}
