import { IGroup } from '@/shared/types/template.types'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import { Fragment, useState } from 'react'

interface CellSelectProps {
	options: IGroup[]
	separator: string
	value: string
	onClickOption: () => void
}

export const CellSelect = ({
	onClickOption,
	options,
	value,
	separator,
}: CellSelectProps) => {
	const [selectedValue, setSelectedValue] = useState('')

	const handleChange = (event: SelectChangeEvent) => {
		setSelectedValue(event.target.value)
	}

	return (
		<FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
			<InputLabel id={selectedValue}>{selectedValue}</InputLabel>
			<Select
				labelId={selectedValue}
				value={selectedValue}
				onChange={handleChange}
			>
				<MenuItem value=''>
					<em>Select</em>
				</MenuItem>

				<MenuItem value={separator}>{separator}</MenuItem>
			</Select>
		</FormControl>
	)
}
