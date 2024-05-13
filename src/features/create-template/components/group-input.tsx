import { IField, IGroup, TypeFieldSize } from '@/shared/types'
import { v4 as uuidv4 } from 'uuid'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'
import {
	Accordion,
	Card,
	Heading,
	PrimaryButton,
	PrimaryInput,
	Text,
} from '@/shared/ui'
import { useTranslation } from 'react-i18next'

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

	const { t } = useTranslation()

	return (
		<Card
			sx={{
				marginTop: '40px',
				outline: isSaved ? '0' : '2px solid #f6ef28',
				outlineStyle: 'dashed',
				alignItems: 'left',
			}}
			fullWidth
		>
			<PrimaryButton
				onClick={deleteGroupHandler}
				sx={{ position: 'absolute', right: '25px', minWidth: '45px' }}
				color='error'
			>
				X
			</PrimaryButton>
			<Heading centered={false}>{title}</Heading>
			<Text>
				<b>{t('group-input.Parent field')}:</b> {parentField}
			</Text>
			<Accordion fullWidth={false} gap={'20px'}>
				<PrimaryButton
					onClick={() => saveGroupHandler(inputFields, title)}
					color='success'
				>
					{t('save')}
				</PrimaryButton>
				<PrimaryButton onClick={() => addField('small')} color='success'>
					{t('group-input.+ Input (small)')}
				</PrimaryButton>
				<PrimaryButton onClick={() => addField('large')} color='success'>
					{t('group-input.+ Input (large)')}
				</PrimaryButton>
			</Accordion>
			<Grid gap={'20px'} container width={'100%'}>
				{inputFields.map(({ index, value, size }, i) => (
					<Grid
						key={index}
						item
						position={'relative'}
						width={size === 'small' ? '272.5px' : '100%'}
					>
						<PrimaryInput
							onChange={(e) => handleChangeInput(e, index)}
							disabled={i === 0}
							defaultValue={value}
							filled
						/>
						{i !== 0 && (
							<PrimaryButton
								onClick={() => deleteField(index)}
								color='secondary'
								sx={{
									right: '0',
									minWidth: '10px',
									height: '20px',
									position: 'absolute',
								}}
							>
								X
							</PrimaryButton>
						)}
					</Grid>
				))}
			</Grid>
		</Card>
	)
}
