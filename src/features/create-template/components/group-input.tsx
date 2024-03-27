import { IField, IGroup, TypeFieldSize } from '@/shared/types'
import { v4 as uuidv4 } from 'uuid'
import {
	Box,
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
	isSaved,
	saveGroupHandler,
	deleteGroupHandler,
	setSavedFalseHandler,
}: IGroup & {
	saveGroupHandler: (fields: IField[], title: string) => void
	deleteGroupHandler: () => void
	setSavedFalseHandler: (title: string) => void
}) => {
	const [inputFields, setInputFields] = useState<IField[]>(fields)

	const addField = (size: TypeFieldSize) => {
		setInputFields((fields) => [
			...fields,
			{ index: uuidv4(), value: '', size },
		])
		setSavedFalseHandler(title)
	}

	const deleteField = (fieldIdx: string) => {
		setSavedFalseHandler(title)
		setInputFields((fields) =>
			fields.filter((field) => field.index !== fieldIdx)
		)
	}

	const handleChangeInput = (
		e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		currentIndex: string
	) => {
		setSavedFalseHandler(title)
		setInputFields((fields) =>
			fields.map((field) =>
				field.index === currentIndex
					? { ...field, value: e.target.value }
					: field
			)
		)
	}

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				marginTop: '40px',
			}}
		>
			<Paper
				sx={{
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
					gap: '20px',
					padding: '25px 25px 45px',
					margin: '0 20px',
					width: '1000px',
					inset: 0,
					outline: isSaved ? '0' : '2px solid #f6ef28',
					outlineStyle: 'dashed',
				}}
				elevation={4}
			>
				<Button
					onClick={deleteGroupHandler}
					color='secondary'
					size='small'
					variant='contained'
					sx={{
						right: '25px',
						minWidth: '35px',
						height: '30px',
						position: 'absolute',
					}}
				>
					X
				</Button>
				<Typography variant='h4'>{title}</Typography>
				<Stack direction={'row'} alignItems={'flex-end'} spacing={2}>
					<Typography variant='h5'>{parentField}</Typography>
					<Button
						size='small'
						variant='contained'
						onClick={() => saveGroupHandler(inputFields, title)}
					>
						save
					</Button>
					<Button
						size='small'
						variant='contained'
						onClick={() => addField('small')}
					>
						+ Input (small)
					</Button>
					<Button
						size='small'
						variant='contained'
						onClick={() => addField('large')}
					>
						+ Input (large)
					</Button>
				</Stack>
				<Grid spacing={2} container>
					{inputFields.map(({ index, value, size }, i) => (
						<Grid key={index} item position={'relative'}>
							<TextField
								size='small'
								variant='filled'
								onChange={(e) => handleChangeInput(e, index)}
								disabled={i === 0}
								defaultValue={value}
								sx={{ width: size === 'small' ? '225px' : '950px' }}
							/>
							{i !== 0 && (
								<Button
									onClick={() => deleteField(index)}
									color='secondary'
									size='small'
									variant='contained'
									sx={{
										right: '0',
										minWidth: '15px',
										height: '20px',
										position: 'absolute',
									}}
								>
									X
								</Button>
							)}
						</Grid>
					))}
				</Grid>
			</Paper>
		</Box>
	)
}
