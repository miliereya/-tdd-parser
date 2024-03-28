import { ICellValue, IGroup, TypeCellValue } from '@/shared/types'
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

	const [cellValues, setCellValues] = useState<ICellValue[]>([])

	const removeValueHandler = (index: number) => {
		setCellValues((prev) => {
			const newArr = []
			for (let i = 0; i < prev.length; i++) {
				if (i === index) continue
				newArr.push(prev[i])
			}
			return newArr
		})
	}

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
						display: 'flex',
						alignItems: 'center',
						gap: '8px',
					}}
				>
					{cellValues.map(({ type, value, fieldIndex, title }, i) => {
						return (
							<Box
								key={fieldIndex + value + type}
								sx={{
									position: 'relative',
                                    minWidth: '20px'
								}}
							>
								<Button
									onClick={() => removeValueHandler(i)}
									size='small'
									variant='contained'
									color='error'
									sx={{
										top: '-30px',
										position: 'absolute',
										minWidth: '100%',
										height: '20px',
										fontSize: '10px',
									}}
								>
									x
								</Button>
								<Typography
									sx={
										type === 'input'
											? {
													background: '#7979dc',
													display: 'flex',
													height: '31px',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: '5px',
													padding: '0px 8px',
													color: '#fff',
											  }
											: {
													display: 'flex',
													height: '31px',
													alignItems: 'center',
													justifyContent: 'center',
											  }
									}
								>
									{title && (
										<span style={{ marginRight: '10px', fontWeight: '700' }}>
											{title}:
										</span>
									)}
									{value === '(space)' ? '(space)' : value}
								</Typography>
							</Box>
						)
					})}
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
						setCellValues={setCellValues}
						closeHandler={() => setAddingValue(false)}
					/>
				)}
			</Stack>
		</Box>
	)
}
