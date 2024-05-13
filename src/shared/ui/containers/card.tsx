import { Box, Paper, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	fullWidth?: boolean
	sx?: SxProps
	onClick?: () => void
}

export const Card = ({ children, fullWidth = false, sx, onClick }: Props) => {
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				position: 'relative',
				gap: '20px',
				padding: '25px',
				margin: '0 20px',
				inset: 0,
				width: fullWidth ? '100%' : 'fit-content',
				...sx,
			}}
			elevation={4}
			onClick={onClick}
		>
			{children}
		</Paper>
	)
}
