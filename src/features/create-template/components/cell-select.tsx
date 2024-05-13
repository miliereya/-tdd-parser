import { ICellValue, IGroup, TypeCellValue } from '@/shared/types'
import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
	groups: IGroup[]
	setCellValues: Dispatch<SetStateAction<ICellValue[]>>
	closeHandler: () => void
}

export const CellSelect = ({ setCellValues, groups, closeHandler }: Props) => {
	const addCellValueHandler = (
		type: TypeCellValue,
		value: string,
		fieldIndex?: string,
		title?: string
	) => {
		setCellValues((prev) => [...prev, { value, type, fieldIndex, title }])
		closeHandler()
	}

	const { t } = useTranslation()

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
		<FormControl
			variant='filled'
			sx={{ minWidth: 120, marginTop: '20px', width: '100%' }}
		>
			<Select value={''}>
				<MenuItem value='' onClick={addTextValueHandler}>
					<Typography fontWeight={500} color={'#49a1e9'}>
						{t('cell-select.Text')}
					</Typography>
				</MenuItem>

				<MenuItem value='' onClick={closeHandler}>
					<Typography fontWeight={500} color={'red'}>
						{t('cell-select.Don&#39;t add value')}
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
			</Select>
		</FormControl>
	)
}
