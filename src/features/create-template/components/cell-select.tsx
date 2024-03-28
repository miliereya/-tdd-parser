import { ICellValue, IGroup, TypeCellValue } from '@/shared/types'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'

interface Props {
	groups: IGroup[]
	separator: string
	setCellValues: Dispatch<SetStateAction<ICellValue[]>>
	closeHandler: () => void
}

export const CellSelect = ({
	setCellValues,
	groups,
	separator,
	closeHandler,
}: Props) => {
	const addCellValueHandler = (
		type: TypeCellValue,
		value: string,
		fieldIndex?: string,
		title?: string
	) => {
		setCellValues((prev) => [...prev, { value, type, fieldIndex, title }])
		closeHandler()
	}

	const addTextValueHandler = () => {
		const text = prompt()
		if (!text) return

		if (text === ' ') {
			addCellValueHandler('separator', '(space)')
			return
		}

		addCellValueHandler('separator', text)
	}

	return (
		<FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
			<Select value={''}>
				<MenuItem value='' onClick={addTextValueHandler}>
					<Typography fontWeight={500} color={'#49a1e9'}>
						Text
					</Typography>
				</MenuItem>

				<MenuItem value='' onClick={closeHandler}>
					<Typography fontWeight={500} color={'red'}>
						Don&#39;t add value
					</Typography>
				</MenuItem>
				{groups.map(({ fields, title }) =>
					fields.map(({ value, index }) => (
						<MenuItem
							key={title + value}
							onClick={() => addCellValueHandler('input', value, index, title)}
							value={value}
						>
							<Typography>
								<span style={{ fontWeight: 700, paddingRight: '10px' }}>
									{title}:
								</span>
								{value}
							</Typography>
						</MenuItem>
					))
				)}
				<MenuItem value={separator}>{separator}</MenuItem>
			</Select>
		</FormControl>
	)
}
