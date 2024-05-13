import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	sx?: SxProps
}

export const Container = ({ children, sx }: Props) => {
	return (
		<Box
			sx={{
				maxWidth: '1200px',
				width: '100%',
				minHeight: '100%',
				margin: '0 auto',
				...sx,
			}}
		>
			{children}
		</Box>
	)
}
