import { Button, TextField } from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react'

interface Props {
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	saveTemplateHandler: () => void
}

export const TitleTemplate = ({ setTitle, title }: Props) => {
	return (
		<div>
			<TextField
				size='small'
				variant='filled'
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<Button
				onClick={saveTemplateHandler}
				size='small'
				variant='contained'
				color='success'
			>
				+
			</Button>
		</div>
	)
}
