import { Cell } from './cell'
import { ICell, IGroup } from '@/shared/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { TypeCreateTemplateState } from '..'
import { IEditingCell } from '../types/cell.types'
import { Card, Container, Heading, PrimaryButton, TextError } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface Props {
	cellsTitles: string[]
	groups: IGroup[]
	setCurrentState: Dispatch<SetStateAction<TypeCreateTemplateState>>
	setCells: Dispatch<SetStateAction<ICell[]>>
}

export const ChainCells = ({
	cellsTitles,
	groups,
	setCurrentState,
	setCells,
}: Props) => {
	const [filledCells, setFilledCells] = useState<IEditingCell[]>(() =>
		cellsTitles.map((c) => ({ cell: { index: c, values: [] }, isSaved: false }))
	)
	const [error, setError] = useState('')
	const { t } = useTranslation()

	const toTitleHandler = () => {
		for (let i = 0; i < filledCells.length; i++) {
			const cell = filledCells[i]
			if (!cell.isSaved) {
				setError(t('cell-chain.Save all cells to continue'))
				return
			}
		}

		setCells(filledCells.map((c) => c.cell))
		setCurrentState('titling template')
	}

	return (
		<Container>
			<Card
				sx={{
					marginTop: '40px',
				}}
				fullWidth
			>
				<Heading>{t('cell-chain.Chain Cells')}</Heading>
				{filledCells.map(({ cell }, i) => {
					return (
						<Cell
							i={i}
							cell={cell}
							groups={groups}
							setFilledCells={setFilledCells}
							key={cell.index}
						/>
					)
				})}
				<TextError text={error} />
				<PrimaryButton
					onClick={toTitleHandler}
					sx={{
						width: '100%',
					}}
				>
					{t('Next')}
				</PrimaryButton>
			</Card>
		</Container>
	)
}
