import { SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	centered?: boolean
	sx?: SxProps
}

export const Heading = ({ children, sx, centered = true }: Props) => {
	return (
		<Typography
			variant='h4'
			sx={{ width: '100%', ...sx }}
			textAlign={centered ? 'center' : 'left'}
		>
			{children}
		</Typography>
	)
}
