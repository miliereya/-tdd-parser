import { ICellValue, IGroup } from '@/types/input.types'
import {
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
import { CellSelect } from '../CellSelect'

interface CustomSelectProps {
	handleSelection?: () => void
	options: IGroup[]
	cell: string
}

export const Cell = ({ cell, options }: CustomSelectProps) => {
	const [separator, setSeparator] = useState('')

	const [toggleSeparator, setToggleSeparator] = useState(false)

	const [cellValues, setCellValues] = useState<ICellValue[]>([])

	const onClickAdd = () => {
		setCellValues((values) => [...values, { value: '', fieldIndex: 1 }])
	}

	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				padding: 2,
			}}
		>
			<Stack flexDirection={'row'} alignItems={'center'} spacing={2}>
				<Typography variant='h5'>{cell}</Typography>
				<Button
					variant='contained'
					color='info'
					size='small'
					onClick={() => setToggleSeparator((separator) => !separator)}
				>
					Separator
				</Button>
				{toggleSeparator && (
					<Input
						sx={{ maxWidth: '30px' }}
						value={separator}
						onChange={(e) => setSeparator(e.target.value)}
						size='small'
					/>
				)}
				<Button
					onClick={onClickAdd}
					size='small'
					variant='contained'
					color='success'
				>
					+
				</Button>
			</Stack>
			<Stack spacing={2}>
				{cellValues.map((value) => (
					<CellSelect
						options={options}
						separator={separator}
						value={value.value}
						onClickOption={() => console.log('clicked')}
						key={value.value}
					/>
				))}
			</Stack>
		</Paper>
	)
}
