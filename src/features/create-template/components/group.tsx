import { IField, IGroup } from '@/shared/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { InputGroup } from './group-input'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { TypeCreateTemplateState } from '..'

interface Props {
	setCurrentState: Dispatch<SetStateAction<TypeCreateTemplateState>>
	groups: IGroup[]
	setGroups: Dispatch<SetStateAction<IGroup[]>>
}

export const TemplateGroup = ({
	setCurrentState,
	groups,
	setGroups,
}: Props) => {
	const [error, setError] = useState('')
	const [nextStepError, setNextStepError] = useState('')

	const [groupTitle, setGroupTitle] = useState('')
	const [groupParentField, setGroupParentField] = useState('')

	const addGroupHandler = (withDb: boolean) => {
		setError('')

		if (!groupParentField || !groupTitle) {
			setError('All fields are required')
			return
		}

		if (groups.some((g) => g.title === groupTitle)) {
			setError('Group title is already used')
			return
		}

		setGroups((prev) => [
			...prev,
			{
				title: groupTitle,
				parentField: groupParentField,
				fields: [{ value: groupParentField, index: uuid(), size: 'large' }],
				isSaved: false,
				withDb,
			},
		])
	}

	const saveGroupHandler = (fields: IField[], title: string) => {
		for (let i = 0; i < fields.length; i++) {
			if (!fields[i].value) {
				alert('All fields should be filled in')
				return
			}
		}

		const fieldsValues = fields.map((f) => f.value)

		if (fieldsValues.length !== new Set(fieldsValues).size) {
			alert('All fields should be unique')
			return
		}
		setGroups((groups) =>
			groups.map((group) =>
				group.title === title
					? { ...group, fields: fields, isSaved: true }
					: group
			)
		)
	}

	const setSavedFalseHandler = (title: string) => {
		setGroups((groups) =>
			groups.map((group) =>
				group.title === title ? { ...group, isSaved: false } : group
			)
		)
	}

	const deleteGroupHandler = (title: string) => {
		setGroups((groups) => groups.filter((group) => group.title !== title))
	}

	const nextStepHandler = () => {
		setNextStepError('')
		if (groups.length === 0) {
			setNextStepError('You should have at least one group')
			return
		}

		for (let i = 0; i < groups.length; i++) {
			if (!groups[i].isSaved) {
				setNextStepError('Save all groups at first')
				return
			}
		}
		setCurrentState('chaining cells')
	}

	return (
		<>
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
						alignItems: 'center',
						position: 'relative',
						gap: '20px',
						padding: '25px 0px 45px',
						margin: '0 20px',
						width: '1000px',
						inset: 0,
					}}
					elevation={4}
				>
					<Stack spacing={2} width={'400px'} sx={{ paddingBottom: '50px' }}>
						<Typography variant='body1' sx={{ color: 'red', fontSize: '18px' }}>
							{nextStepError}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Button
								variant='contained'
								size='large'
								onClick={() => setCurrentState('waiting for file')}
								sx={{
									width: '150px',
								}}
							>
								Back
							</Button>
							<Button
								variant='contained'
								size='large'
								onClick={nextStepHandler}
								sx={{
									width: '150px',
								}}
							>
								next
							</Button>
						</Box>
					</Stack>
					<Typography variant='h4'>Data groups</Typography>
					<Stack spacing={2} width={'400px'}>
						<TextField
							size='small'
							sx={{ width: '400px' }}
							label='Group title'
							onChange={(e) => setGroupTitle(e.target.value)}
							value={groupTitle}
						/>
						<TextField
							size='small'
							label='Group parent'
							onChange={(e) => setGroupParentField(e.target.value)}
							type='text'
							value={groupParentField}
						/>
						<Typography variant='body1' sx={{ color: 'red' }}>
							{error}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Button
								variant='contained'
								onClick={() => addGroupHandler(false)}
							>
								add group
							</Button>
							<Button variant='contained' onClick={() => addGroupHandler(true)}>
								add group ( with database )
							</Button>
						</Box>
					</Stack>
				</Paper>
			</Box>
			{groups.map((group) => (
				<InputGroup
					saveGroupHandler={saveGroupHandler}
					setSavedFalseHandler={setSavedFalseHandler}
					key={group.title}
					{...group}
					deleteGroupHandler={() => deleteGroupHandler(group.title)}
				/>
			))}
		</>
	)
}
