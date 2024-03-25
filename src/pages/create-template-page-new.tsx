'use client'

import {
	TemplateFileInput,
	TypeCreateTemplateState,
} from '@/features/create-template'
import { useState } from 'react'

export const CreateTemplatePageNew = () => {
	const [currentState, setCurrentState] =
		useState<TypeCreateTemplateState>('waiting for file')
	const [cells, setCells] = useState<string[]>([])
	const [templateFile, setTemplateFile] = useState<ArrayBuffer>()

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
		</>
	)
}
