import { Workbook } from 'exceljs'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { TypeCreateTemplateState } from '..'
import { extractCellsFromWB, prepareCells } from '../lib/utils'
import { ERROR_EMPTY_CELL, ERROR_NO_WS } from '../config/error.config'
import { ACCEPTED_FILES_EXTENSIONS } from '../config/constants'
import { Card, Centered, Container, FileInput, Heading } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface Props {
	setCellsTitles: Dispatch<SetStateAction<string[]>>
	setTemplateFile: Dispatch<SetStateAction<File | undefined>>
	setCurrentState: Dispatch<SetStateAction<TypeCreateTemplateState>>
}

export const TemplateFileInput = ({
	setCellsTitles,
	setTemplateFile,
	setCurrentState,
}: Props) => {
	const [error, setError] = useState('')

	const { t } = useTranslation()

	const loadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			if (!e.target.files || e.target.files.length > 1) return

			setCurrentState('loading data')

			const wb = new Workbook() // create workBook.
			const file = await e.target.files[0].arrayBuffer()

			await wb.xlsx.load(file) // load our template to our instance.
			const cells = extractCellsFromWB(wb)
			if (!cells.length) throw ERROR_EMPTY_CELL

			setCellsTitles(prepareCells(cells))
			setTemplateFile(e.target.files[0])

			setCurrentState('loaded file')
		} catch (e) {
			setCurrentState('waiting for file')

			switch (e) {
				case ERROR_NO_WS:
					setError(t('file-input.Empty template error'))
					break
				case ERROR_EMPTY_CELL:
					setError(t('file-input.Wrong filled template'))
				default:
					setError(t('Unexpected error'))
			}
		}
	}
	return (
		<Centered sx={{ marginTop: '100px' }}>
			<Card>
				<Heading>{t('file-input.Import excel template')}</Heading>
				<FileInput
					name={'load template file'}
					error={error}
					onChange={loadHandler}
					accept={ACCEPTED_FILES_EXTENSIONS}
				/>
			</Card>
		</Centered>
	)
}
