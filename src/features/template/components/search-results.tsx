import { SearchDataResults } from '@/shared/types'
import { Card, Text } from '@/shared/ui'
import { Button } from '@mui/material'

interface Props {
	results: SearchDataResults[]
	closeHandler: () => void
	chooseResult: (result: SearchDataResults) => void
}

export const SearchResults = ({
	results,
	chooseResult,
	closeHandler,
}: Props) => {
	return (
		<Card
			sx={{
				position: 'absolute',
				alignItems: 'left',
				inset: 'auto',
				top: '40px',
				margin: 0,
				padding: '5px',
				gap: 0,
				zIndex: 10,
			}}
            fullWidth
			onClick={closeHandler}
		>
			{results.map((r) => {
				const { _id, parentValue } = r
				return (
					<Button
						style={{ color: '#000' }}
						key={_id}
						onClick={() => chooseResult(r)}
					>
						<Text sx={{ textTransform: 'none', fontSize: '16px' }}>{parentValue}</Text>
					</Button>
				)
			})}
		</Card>
	)
}
