'use client'
import { Template, TemplatesList } from '@/features/template'
import { templateApi } from '@/shared/api/template.api'
import { ITemplate } from '@/shared/types'
import { Container, PrimaryLoader } from '@/shared/ui'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TemplatePage() {
	const { push } = useRouter()

	const params = useSearchParams()
	const _id = params?.get('_id')

	const [template, setTemplate] = useState<ITemplate>()
	const [isLoading, setLoading] = useState(true)

	useEffect(() => {
		;(async () => {
			try {
				if (!_id || Array.isArray(_id)) {
					throw 'error'
				}
				const fetchedTemplate = await templateApi.getById(_id)
				setTemplate(fetchedTemplate)
			} catch (e) {
				// push('/templates')
				return
			} finally {
				setLoading(false)
			}
		})()
	}, [push, _id])

	return (
		<Container>
			{isLoading || !template ? (
				<PrimaryLoader sx={{ marginTop: '150px' }} />
			) : (
				<Template template={template} />
			)}
		</Container>
	)
}
