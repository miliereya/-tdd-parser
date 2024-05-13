import { CircularProgress, SxProps } from '@mui/material'
import { Centered } from '../containers'

interface Props {
	sx?: SxProps
	containerSx?: SxProps
}

export const PrimaryLoader = ({ sx, containerSx }: Props) => {
	return (
		<Centered sx={containerSx}>
			<CircularProgress sx={sx} size={'10%'} />
		</Centered>
	)
}
