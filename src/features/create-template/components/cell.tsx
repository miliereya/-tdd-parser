import { ICell, ICellValue, IGroup } from '@/shared/types'
import { Box, Stack, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'
import { CellSelect } from './cell-select'
import { TypeCellInput } from '../types/state.types'
import { CellOperation } from './cell-operation'
import { IEditingCell } from '../types/cell.types'
import { Accordion, PrimaryButton, Text } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface CustomSelectProps {
	handleSelection?: () => void
	groups: IGroup[]
	cell: ICell
	setFilledCells: Dispatch<SetStateAction<IEditingCell[]>>
	i: number
}

export const Cell = ({
	cell,
	groups,
	setFilledCells,
	i,
}: CustomSelectProps) => {
	const [cellInput, setCellInput] = useState<TypeCellInput>(null)
	const [cellValues, setCellValues] = useState<ICellValue[]>([])
	const [isSaved, setSaved] = useState(false)

	const { t } = useTranslation()

	const removeValueHandler = (index: number) => {
		setSaved(false)
		setCellValues((prev) => {
			const newArr = []
			for (let i = 0; i < prev.length; i++) {
				if (i === index) continue
				newArr.push(prev[i])
			}
			return newArr
		})
	}

	const saveHandler = () => {
		if (cellInput) {
			return alert(t('cell.Save new field at first'))
		}

		if (cellValues.length === 0) {
			return alert(t("cell.Cell can't be empty"))
		}

		setFilledCells((prev) =>
			prev.map((c, index) =>
				index === i
					? { cell: { index: c.cell.index, values: cellValues }, isSaved: true }
					: c
			)
		)

		setSaved(true)
	}

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				flexDirection: 'column',
				gap: '5px',
				padding: '2px',
				position: 'relative',
				// opacity: isSaved ? 0.7 : 1,
			}}
		>
			<Accordion>
				<Text centered={false} sx={{ paddingRight: '40px' }}>
					{cell.index}
				</Text>
				{isSaved ? (
					<PrimaryButton
						onClick={() => setSaved(false)}
						sx={{ marginLeft: '15px', height: '40px' }}
					>
						{t('Edit')}
					</PrimaryButton>
				) : (
					<PrimaryButton
						onClick={saveHandler}
						sx={{ marginLeft: '15px', height: '40px' }}
						color='success'
					>
						{t('Save')}
					</PrimaryButton>
				)}
			</Accordion>

			<Accordion sx={{ marginTop: '20px' }}>
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
									minWidth: '20px',
								}}
							>
								<PrimaryButton
									onClick={() => removeValueHandler(i)}
									color='error'
									sx={{
										top: '-26px',
										position: 'absolute',
										minWidth: '100%',
										height: '17px',
										fontSize: '10px',
									}}
									disabled={isSaved}
								>
									x
								</PrimaryButton>
								<Typography
									sx={
										type === 'input'
											? {
													background: '#7979dc',
													display: 'flex',
													height: '40px',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: '5px',
													padding: '0px 8px',
													color: '#fff',
											  }
											: type === 'separator'
											? {
													display: 'flex',
													height: '40px',
													alignItems: 'center',
													justifyContent: 'center',
													minWidth: '40px',
													textAlign: 'center',
											  }
											: {
													background: '#e4a82f',
													display: 'flex',
													height: '40px',
													alignItems: 'center',
													justifyContent: 'center',
													borderRadius: '5px',
													padding: '0px 8px',
													color: '#fff',
											  }
									}
								>
									{title && type === 'input' && (
										<span style={{ marginRight: '10px', fontWeight: '700' }}>
											{title}:
										</span>
									)}
									{type === 'separator' || type === 'input'
										? value === '(space)'
											? '(space)'
											: value
										: title}
								</Typography>
							</Box>
						)
					})}
					{!cellInput && (
						<>
							<PrimaryButton
								onClick={() => setCellInput('input')}
								color='success'
								sx={{ height: '40px' }}
								disabled={isSaved}
							>
								{t('cell.+ input')}
							</PrimaryButton>
							<PrimaryButton
								onClick={() => setCellInput('operation')}
								color='success'
								sx={{ height: '40px' }}
								disabled={isSaved}
							>
								{t('cell.+ operation')}
							</PrimaryButton>
						</>
					)}
				</Box>
			</Accordion>
			<Accordion>
				{cellInput === 'input' && (
					<CellSelect
						groups={groups}
						setCellValues={setCellValues}
						closeHandler={() => setCellInput(null)}
					/>
				)}
				{cellInput === 'operation' && (
					<CellOperation
						groups={groups}
						setCellValues={setCellValues}
						closeHandler={() => setCellInput(null)}
					/>
				)}
			</Accordion>
		</Box>
	)
}
