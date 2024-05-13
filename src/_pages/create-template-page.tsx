'use client'

import {
	ChainCells,
	TemplateFileInput,
	TemplateGroup,
	TypeCreateTemplateState,
} from '@/features/create-template'
import { TitleTemplate } from '@/features/create-template/components/title-template'
import { templateApi } from '@/shared/api/template.api'
import { ICell, IGroup } from '@/shared/types'
import { Container } from '@/shared/ui'
import { useState } from 'react'

export default function CreateTemplatePage() {
	const [currentState, setCurrentState] =
		useState<TypeCreateTemplateState>('waiting for file')
	const [cellsTitles, setCellsTitles] = useState<string[]>([])
	const [cells, setCells] = useState<ICell[]>([])
	const [title, setTitle] = useState('')
	const [templateFile, setTemplateFile] = useState<File>()
	const [groups, setGroups] = useState<IGroup[]>([])

	const saveTemplateHandler = async () => {
		if (!templateFile) return alert('Something went wrong')

		const nameArray = templateFile.name.split('.')
		const fileType = nameArray[nameArray.length - 1]

		await templateApi.create({
			cells,
			groups,
			title,
			file: templateFile,
			fileType,
		})
	}

	return (
		<Container>
			{(currentState === 'waiting for file' ||
				currentState === 'loading data') && (
				<TemplateFileInput
					setCurrentState={setCurrentState}
					setCellsTitles={setCellsTitles}
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
				<ChainCells
					setCurrentState={setCurrentState}
					groups={groups}
					cellsTitles={cellsTitles}
					setCells={setCells}
				/>
			)}
			{currentState === 'titling template' && (
				<TitleTemplate
					saveTemplateHandler={saveTemplateHandler}
					setTitle={setTitle}
					title={title}
				/>
			)}
		</Container>
	)
}
