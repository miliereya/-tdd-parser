import { IGroup } from '@/shared/types/template.types'
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Typography,
} from '@mui/material'
import { Fragment, useState } from 'react'

interface Props {
	groups: IGroup[]
	separator: string
	onClickOption: () => void
	closeHandler: () => void
}

export const CellSelect = ({
	onClickOption,
	groups,
	separator,
	closeHandler,
}: Props) => {
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
				<MenuItem value='' onClick={closeHandler}>
					<Typography fontWeight={500} color={'red'}>Don&#39;t add value</Typography>
				</MenuItem>
				{groups.map(({ fields, title }) => {
					return (
						<Fragment key={+new Date()}>
							{fields.map(({ value }) => (
								<MenuItem
									key={+new Date()}
									onClick={onClickOption}
									value={value}
								>
									<Typography>
										<span style={{ fontWeight: 700, paddingRight: '10px' }}>
											{title}:
										</span>
										{value}
									</Typography>
								</MenuItem>
							))}
						</Fragment>
					)
				})}
				<MenuItem value={separator}>{separator}</MenuItem>
			</Select>
		</FormControl>
	)
}
