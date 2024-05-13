import { IField, IGroup } from '@/shared/types'
import { Dispatch, SetStateAction, useState } from 'react'
import { InputGroup } from './group-input'
import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { v4 as uuid } from 'uuid'
import { TypeCreateTemplateState } from '..'
import {
	Accordion,
	Card,
	Container,
	Heading,
	PrimaryButton,
	PrimaryInput,
	TextError,
} from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()

	const addGroupHandler = (withDb: boolean) => {
		if (!groupParentField || !groupTitle) {
			setError(t('group.All fields are required'))
			return
		}

		if (groups.some((g) => g.title === groupTitle)) {
			setError(t('group.Group title is already used'))
			return
		}

		setError('')
		setGroupTitle('')
		setGroupParentField('')

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
				alert(t('group.All fields should be filled in'))
				return
			}
		}

		const fieldsValues = fields.map((f) => f.value)

		if (fieldsValues.length !== new Set(fieldsValues).size) {
			alert(t('group.All fields should be unique'))
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
			setNextStepError(t('group.You should have at least one group'))
			return
		}

		for (let i = 0; i < groups.length; i++) {
			if (!groups[i].isSaved) {
				setNextStepError(t('group.Save all groups at first'))
				return
			}
		}
		setCurrentState('chaining cells')
	}

	return (
		<Container>
			<Card
				fullWidth
				sx={{
					marginTop: '50px',
				}}
			>
				<TextError text={nextStepError} />
				<Accordion>
					<PrimaryButton
						sx={{ width: '120px' }}
						onClick={() => setCurrentState('waiting for file')}
					>
						{t('Back')}
					</PrimaryButton>
					<PrimaryButton sx={{ width: '120px' }} onClick={nextStepHandler}>
						{t('Next')}
					</PrimaryButton>
				</Accordion>
				<Heading>{t('group.Data groups')}</Heading>
				<Accordion gap={'20px'} row={false}>
					<PrimaryInput
						label={t('group.Group title')}
						onChange={(e) => setGroupTitle(e.target.value)}
						value={groupTitle}
					/>
					<PrimaryInput
						label={t('group.Group parent')}
						onChange={(e) => setGroupParentField(e.target.value)}
						value={groupParentField}
					/>
					<TextError text={error} />
					<Accordion sx={{ width: 'fit-content' }} gap='20px'>
						<PrimaryButton
							onClick={() => addGroupHandler(false)}
							color='success'
						>
							{t('group.add group')}
						</PrimaryButton>
						<PrimaryButton
							onClick={() => addGroupHandler(true)}
							color='success'
						>
							{t('group.add group ( with database )')}
						</PrimaryButton>
					</Accordion>
				</Accordion>
			</Card>
			{groups.map((group) => (
				<InputGroup
					saveGroupHandler={saveGroupHandler}
					setSavedFalseHandler={setSavedFalseHandler}
					key={group.title}
					{...group}
					deleteGroupHandler={() => deleteGroupHandler(group.title)}
				/>
			))}
		</Container>
	)
}
