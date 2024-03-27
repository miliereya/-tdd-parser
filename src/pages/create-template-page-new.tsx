'use client'

import {
	ChainCells,
	TemplateFileInput,
	TemplateGroup,
	TypeCreateTemplateState,
} from '@/features/create-template'
import { IGroup } from '@/shared/types'
import { Box, Paper } from '@mui/material'
import { useState } from 'react'

export const CreateTemplatePageNew = () => {
	const [currentState, setCurrentState] =
		useState<TypeCreateTemplateState>('chaining cells')
	const [cells, setCells] = useState<string[]>(['CELL_1', 'CELL_2', 'CELL_3'])
	const [templateFile, setTemplateFile] = useState<ArrayBuffer>()
	const [groups, setGroups] = useState<IGroup[]>([
		{
			fields: [
				{ size: 'small', index: '2561262', value: 'Номер' },
				{ size: 'small', index: '5126126', value: 'Марка' },
				{ size: 'small', index: '6127812', value: 'Водитель' },
			],
			isSaved: true,
			parentField: 'Номер',
			title: 'Авто',
			withDb: true,
		},
		{
			fields: [
				{ size: 'small', index: '6126128', value: 'Номер' },
				{ size: 'small', index: '2221779', value: 'Вес' },
				{ size: 'small', index: '3161232', value: 'ФИО' },
			],
			isSaved: true,
			parentField: 'Номер',
			title: 'Прицеп',
			withDb: true,
		},
	])

	return (
		<>
			{(currentState === 'waiting for file' ||
				currentState === 'loading data') && (
				<TemplateFileInput
					setCurrentState={setCurrentState}
					setCells={setCells}
					setTemplateFile={setTemplateFile}
				/>
			)}
			{currentState === 'loaded file' && (
				<TemplateGroup
					groups={groups}
					setGroups={setGroups}
					setCurrentState={setCurrentState}
				/>
			)}
			{currentState === 'chaining cells' && (
				<ChainCells groups={groups} cells={cells} />
			)}
		</>
	)
}
