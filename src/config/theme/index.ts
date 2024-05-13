'use client'

import { Roboto } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { ThemeOptions } from '@mui/material/styles'

const roboto = Roboto({
	weight: ['300', '400', '500', '700'],
	subsets: ['latin'],
	display: 'swap',
})

export const themeOptions: ThemeOptions = {
	palette: {
		mode: 'light',
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f50057',
		},
		info: {
			main: '#fff',
		},
	},
}

const theme = createTheme({
	...themeOptions,
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
})

export { theme }
