import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	row?: boolean
	sx?: SxProps
}

export const Centered = ({ children, row = false, sx }: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: row ? 'row' : 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				height: '100%',
				...sx,
			}}
		>
			{children}
		</Box>
	)
}
