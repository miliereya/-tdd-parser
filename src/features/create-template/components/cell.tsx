import { ICellValue, IGroup } from '@/shared/types/template.types'
import {
	Box,
	Button,
	Input,
	MenuItem,
	Paper,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useState } from 'react'
import { CellSelect } from './cell-select'

interface CustomSelectProps {
	handleSelection?: () => void
	groups: IGroup[]
	cell: string
}

export const Cell = ({ cell, groups }: CustomSelectProps) => {
	const [separator, setSeparator] = useState('')
	const [isAddingValue, setAddingValue] = useState(false)

	const [toggleSeparator, setToggleSeparator] = useState(false)

	const [cellValues, setCellValues] = useState<ICellValue[]>([])

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				padding: 2,
			}}
		>
			<Stack flexDirection={'row'} alignItems={'center'} spacing={2}>
				<Typography variant='h5' sx={{ paddingRight: '40px' }}>
					{cell}
				</Typography>
				<Box
					sx={{
						borderBottom: '2px solid #000',
						width: '100%',
						paddingBottom: '10px',
					}}
				>
					{/* <Button
						variant='contained'
						color='info'
						size='small'
						onClick={() => setToggleSeparator((separator) => !separator)}
					>
						Separator
					</Button> */}
					{/* {toggleSeparator && (
						<Input
							sx={{ maxWidth: '30px' }}
							value={separator}
							onChange={(e) => setSeparator(e.target.value)}
							size='small'
						/>
					)} */}
					{!isAddingValue && (
						<Button
							onClick={() => setAddingValue(true)}
							size='small'
							variant='contained'
							color='success'
						>
							+
						</Button>
					)}
				</Box>
			</Stack>
			<Stack spacing={2}>
				{isAddingValue && (
					<CellSelect
						groups={groups}
						separator={separator}
						onClickOption={() => console.log('clicked')}
						closeHandler={() => setAddingValue(false)}
					/>
				)}
			</Stack>
		</Box>
	)
}
