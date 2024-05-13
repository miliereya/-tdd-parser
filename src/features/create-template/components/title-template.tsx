import {
	Card,
	Centered,
	Container,
	Heading,
	PrimaryButton,
	PrimaryInput,
	TextError,
} from '@/shared/ui'
import axios from 'axios'
import { Dispatch, SetStateAction, useState } from 'react'
import { TITLE_USED } from '../config/error.config'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface Props {
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	saveTemplateHandler: () => Promise<void>
}

export const TitleTemplate = ({
	setTitle,
	title,
	saveTemplateHandler,
}: Props) => {
	const [error, setError] = useState('')
	const { push } = useRouter()

	const { t } = useTranslation()

	const saveHandler = async () => {
		setError('')
		if (!title) {
			return setError(t('title-template.Please enter a title'))
		}
		try {
			await saveTemplateHandler()
			push('templates')
		} catch (e) {
			if (axios.isAxiosError(e)) {
				const data = e.response?.data

				const message = Array.isArray(data.message)
					? data.message[0]
					: data.message

				switch (message) {
					case TITLE_USED:
						setError(t('title-template.Title is already used'))
					default:
						setError(t('title-template.Something went wrong...'))
				}
			}
		}
	}

	return (
		<Container sx={{ marginTop: '100px' }}>
			<Centered>
				<Card>
					<Heading>
						{t('title-template.Enter a title for your template')}
					</Heading>
					<PrimaryInput
						onChange={(e) => setTitle(e.target.value)}
						value={title}
					/>
					<PrimaryButton sx={{ width: '100%' }} onClick={saveHandler}>
						{t('title-template.Save template')}
					</PrimaryButton>
					<TextError text={error} />
				</Card>
			</Centered>
		</Container>
	)
}
