import { ICellValue, IGroup, TypeOperation } from '@/shared/types'
import {
	Box,
	Button,
	FormControl,
	MenuItem,
	Select,
	Typography,
} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { OPERATIONS } from '../config/constants'
import { IOperationValue } from '../types/cell.types'
import { Accordion, PrimaryButton, TextError } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface Props {
	groups: IGroup[]
	setCellValues: Dispatch<SetStateAction<ICellValue[]>>
	closeHandler: () => void
}

export const CellOperation = ({
	setCellValues,
	groups,
	closeHandler,
}: Props) => {
	const [operation, setOperation] = useState<TypeOperation>('+')
	const [firstValue, setFirstValue] = useState<IOperationValue>()
	const [secondValue, setSecondValue] = useState<IOperationValue>()
	const [error, setError] = useState('')

	const { t } = useTranslation()

	const addCellValueHandler = () => {
		if (!firstValue || !secondValue || !operation) {
			setError('cell-select.All cells must be filled')
			return
		}
		setCellValues((prev) => [
			...prev,
			{
				type: operation,
				value: `${firstValue?.fieldIndex}|${secondValue.fieldIndex}`,
				title: `${firstValue.title}: ${firstValue.value} ${operation} ${secondValue.title}: ${secondValue.value}`,
			},
		])
		closeHandler()
	}

	return (
		<Accordion row={false} fullWidth gap='10px' sx={{ marginTop: '20px' }}>
			<FormControl variant='filled' sx={{ minWidth: 120, width: '100%' }}>
				<Select
					value={firstValue ? `${firstValue.title}: ${firstValue.value}` : ''}
				>
					<MenuItem value='' onClick={closeHandler}>
						<Typography fontWeight={500} color={'red'}>
							{t('cell-select.Don&#39;t add value')}
						</Typography>
					</MenuItem>
					{groups.map(({ fields, title }) =>
						fields.map(({ value, index }) => (
							<MenuItem
								key={title + value}
								onClick={() =>
									setFirstValue({ fieldIndex: index, value, title })
								}
								value={`${title}: ${value}`}
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
			<FormControl variant='filled' sx={{ minWidth: 120, width: '100%' }}>
				<Select value={operation}>
					{OPERATIONS.map((o) => (
						<MenuItem key={o} onClick={() => setOperation(o)} value={o}>
							<Typography>{o}</Typography>
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl variant='filled' sx={{ minWidth: 120, width: '100%' }}>
				<Select
					value={
						secondValue ? `${secondValue.title}: ${secondValue.value}` : ''
					}
				>
					<MenuItem value='' onClick={closeHandler}>
						<Typography fontWeight={500} color={'red'}>
							{t('cell-select.Don&#39;t add value')}
						</Typography>
					</MenuItem>
					{groups.map(({ fields, title }) =>
						fields.map(({ value, index }) => (
							<MenuItem
								key={title + value}
								onClick={() =>
									setSecondValue({ fieldIndex: index, value, title })
								}
								value={`${title}: ${value}`}
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
			<TextError text={error} />
			<PrimaryButton onClick={addCellValueHandler} color='success'>
				{t('Add')}
			</PrimaryButton>
		</Accordion>
	)
}
