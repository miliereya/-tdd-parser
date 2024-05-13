import { Button, SxProps } from '@mui/material'
import { ReactNode } from 'react'
import { Centered } from '../containers'

interface Props {
	children: ReactNode
	onClick: () => void
	color?: 'primary' | 'secondary' | 'error' | 'success' | 'info'
	sx?: SxProps
	disabled?: boolean
}

export const PrimaryButton = ({
	children,
	color = 'primary',
	sx,

	...rest
}: Props) => {
	return (
		<Button
			color={color}
			size='small'
			variant='contained'
			sx={{
				padding: '8px 15px',
				...sx,
			}}
			{...rest}
		>
			<Centered>{children}</Centered>
		</Button>
	)
}
