import { SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	centered?: boolean
	sx?: SxProps
	color?: string
}

export const Text = ({ sx, children, centered = false }: Props) => {
	return (
		<Typography
			textAlign={centered ? 'center' : 'left'}
			variant='h5'
			sx={{ width: '100%', ...sx }}
		>
			{children}
		</Typography>
	)
}
