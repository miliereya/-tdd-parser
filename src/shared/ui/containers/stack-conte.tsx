import { Box, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	gap?: string
	fullWidth?: boolean
	row?: boolean
	sx?: SxProps
}

export const Accordion = ({
	children,
	row = true,
	fullWidth = true,
	gap,
	sx,
}: Props) => {
	return (
		<Box
			flexDirection={row ? 'row' : 'column'}
			justifyContent={'space-between'}
			gap={gap}
			sx={{
				display: 'flex',
				width: fullWidth ? '100%' : 'fit-content',
				...sx,
			}}
		>
			{children}
		</Box>
	)
}
