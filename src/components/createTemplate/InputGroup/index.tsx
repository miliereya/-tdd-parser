import { IField, IGroup } from '@/shared/types/template.types'
import { v4 as uuidv4 } from 'uuid'
import {
	Button,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { ChangeEvent, useState } from 'react'

export const InputGroup = ({
	fields,
	parentField,
	title,
	saveHandler,
}: IGroup & { saveHandler: (fields: IField[], title: string) => void }) => {
	const [inputFields, setInputFields] = useState<IField[]>(fields)

	const addField = () =>
		setInputFields((fields) => [...fields, { index: uuidv4(), value: '' }])

	const deleteField = (fieldIdx: string) => {
		setInputFields((fields) =>
			fields.filter((field) => field.index !== fieldIdx)
		)
	}

	const handleChangeInput = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		currentIndex: string
	) => {
		setInputFields((fields) =>
			fields.map((field) =>
				field.index === currentIndex
					? { ...field, value: e.target.value }
					: field
			)
		)
	}

	return (
		<Paper
			sx={{
				width: '100%',
				maxWidth: '800px',
				margin: '20px auto',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
				padding: 2,
			}}
			elevation={3}
		>
			<Typography variant='h4'>{title}</Typography>
			<Stack direction={'row'} alignItems={'flex-end'} spacing={2}>
				<Typography variant='h5'>{parentField}</Typography>
				<Button
					size='small'
					variant='contained'
					onClick={() => saveHandler(fields, title)}
				>
					save
				</Button>
				<Button size='small' variant='contained' onClick={addField}>
					+Input
				</Button>
				<Grid spacing={2} container>
					{inputFields.map((field) => (
						<Grid key={field.index} item>
							<TextField
								size='small'
								variant='filled'
								onChange={(e) => handleChangeInput(e, field.index)}
							/>
							<Button
								onClick={() => deleteField(field.index)}
								color='secondary'
								size='small'
								variant='contained'
								sx={{ marginLeft: '5px', minWidth: '40px' }}
							>
								X
							</Button>
						</Grid>
					))}
				</Grid>
			</Stack>
		</Paper>
	)
}
