'use client'
import { templateApi } from '@/shared/api/template.api'
import { ITemplate } from '@/shared/types'
import {
	Accordion,
	Card,
	Centered,
	Heading,
	PrimaryButton,
	PrimaryInput,
	PrimaryLoader,
	Text,
} from '@/shared/ui'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const TemplatesList = () => {
	const [templates, setTemplates] = useState<ITemplate[]>([])
	const [title, setTitle] = useState('')
	const [isLoading, setLoading] = useState(true)

	const { t } = useTranslation()

	const fetchTemplates = useCallback(async () => {
		setLoading(true)
		try {
			const templates = await templateApi.getAll()
			setTemplates(templates)
		} catch (e) {
		} finally {
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		window.scroll({ top: 0 })
		fetchTemplates()
	}, [fetchTemplates])

	const deleteTemplateHandler = async (title: string) => {
		try {
			await templateApi.delete(title)
			fetchTemplates()
		} catch (e) {
			alert(t('templates-list.Error deleting template'))
		}
	}

	return (
		<>
			<PrimaryInput
				onChange={(e) => setTitle(e.target.value)}
				filled
				label={t('templates-list.Search by Title')}
				sx={{ marginTop: '35px' }}
			/>
			<Accordion row={false} gap='10px' sx={{ marginTop: '20px' }} fullWidth>
				{isLoading ? (
					<PrimaryLoader containerSx={{ marginTop: '150px' }} />
				) : templates.length === 0 ? (
					<Heading sx={{ marginTop: '50px' }}>
						{t('templates-list.You have no templates yet')}
					</Heading>
				) : (
					templates
						.filter((t) => new RegExp(title).test(t.title))
						.map(({ _id, title }) => {
							return (
								<Card
									fullWidth
									sx={{
										padding: '13px 13px',
										margin: 0,
									}}
									key={_id}
								>
									<Accordion>
										<Accordion key={_id} fullWidth>
											<Link href={`template?_id=${_id}`}>
												<Centered>
													<Text sx={{ color: '#000' }}>{title}</Text>
												</Centered>
											</Link>
											<PrimaryButton
												onClick={() => deleteTemplateHandler(title)}
												color='error'
											>
												{t('Delete')}
											</PrimaryButton>
										</Accordion>
									</Accordion>
								</Card>
							)
						})
				)}
			</Accordion>
		</>
	)
}
