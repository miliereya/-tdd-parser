import { Box, Button, Paper, Typography } from '@mui/material'
import { Workbook } from 'exceljs'
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { TypeCreateTemplateState } from '..'
import { extractCellsFromWB, prepareCells } from '../lib/utils'
import { ERROR_EMPTY_CELL, ERROR_NO_WS } from '../config/error.config'
import {
	ACCEPTED_FILES_EXTENSIONS,
	LOAD_TEMPLATE_ID,
} from '../config/constants'

interface Props {
	setCells: Dispatch<SetStateAction<string[]>>
	setTemplateFile: Dispatch<SetStateAction<ArrayBuffer | undefined>>
	setCurrentState: Dispatch<SetStateAction<TypeCreateTemplateState>>
}

export const TemplateFileInput = ({
	setCells,
	setTemplateFile,
	setCurrentState,
}: Props) => {
	const [error, setError] = useState('')

	const loadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			if (!e.target.files || e.target.files.length > 1) return

			setCurrentState('loading data')

			const wb = new Workbook() // create workBook.
			const file = await e.target.files[0].arrayBuffer()

			await wb.xlsx.load(file) // load our template to our instance.

			const cells = extractCellsFromWB(wb)
			if (!cells.length) throw ERROR_EMPTY_CELL

			setCells(prepareCells(cells))
			setTemplateFile(file)

			setCurrentState('loaded file')
		} catch (e) {
			setCurrentState('waiting for file')

			switch (e) {
				case ERROR_NO_WS:
					setError('Empty template error')
					break
				case ERROR_EMPTY_CELL:
					setError('Wrong filled template')
				default:
					setError('Unexpected error')
			}
		}
	}
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100vh',
				}}
			>
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'relative',
						gap: '20px',
						padding: '25px 0px 45px',
						margin: '0 20px',
						width: '400px',
						inset: 0,
					}}
					elevation={4}
				>
					<Typography variant='h4'>Import excel template</Typography>
					<Button
						variant='contained'
						color='secondary'
						sx={{ marginTop: '15px', fontSize: '20px' }}
					>
						<label htmlFor={LOAD_TEMPLATE_ID}>Press to load</label>
					</Button>
					<input
						id={LOAD_TEMPLATE_ID}
						style={{
							display: 'none',
						}}
						type='file'
						onChange={loadHandler}
						accept={ACCEPTED_FILES_EXTENSIONS}
					/>
					<Typography variant='body1' sx={{ color: 'red' }}>
						{error}
					</Typography>
				</Paper>
			</Box>
		</>
	)
}
