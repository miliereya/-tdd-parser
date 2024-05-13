import { SxProps, Typography } from '@mui/material'

interface Props {
	text: string
	sx?: SxProps
}

export const TextError = ({ text, sx }: Props) => {
	return (
		<Typography variant='body1' sx={{ color: 'red', fontSize: '18px', ...sx }}>
			{text}
		</Typography>
	)
}
