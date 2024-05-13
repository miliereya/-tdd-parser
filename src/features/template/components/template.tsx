'use client'
import { ITemplate } from '@/shared/types'
import { Accordion, Card, Heading, PrimaryButton, Text } from '@/shared/ui'
import { TemplateGroup } from './template-group'
import { dataApi } from '@/shared/api'
import { useEffect, useState } from 'react'
import { Workbook } from 'exceljs'
import saveAs from 'file-saver'
import { Checkbox } from '@mui/material'
import { fillCells, prepareGroups } from '../lib/utils'
import { useTranslation } from 'react-i18next'

interface Props {
	template: ITemplate
}

export const Template = ({ template }: Props) => {
	const { cells, filePath, groups, title } = template
	const [pres, setPres] = useState<null | Workbook>(null)
	const [shouldClearFields, setShouldClearFields] = useState(true)

	const { t } = useTranslation()

	/* Fetch and update the state once */
	useEffect(() => {
		;(async () => {
			try {
				const wb = new Workbook() // create workBook.
				const file = await (await fetch(filePath)).arrayBuffer()
				await wb.xlsx.load(file) // load our template to our instance.
				setPres(wb) // set instance to state // we can use ref
			} catch (error) {
				console.log(error)
			}
		})()
	}, [filePath])

	const [groupsKey, setGroupsKey] = useState(0)

	const convertHandler = async () => {
		if (!pres) return
		const fieldsIndexes: string[] = []

		for (let i = 0; i < groups.length; i++) {
			groups[i].fields.forEach((f) => fieldsIndexes.push(f.index))
		}
		const newGroups = prepareGroups(groups)

		pres.worksheets[0]?.eachRow((r, n) => {
			fillCells(r, cells)
		})

		const buffer = await pres.xlsx.writeBuffer({
			//create buffer with options --useStyles is expensive operation, also mb we need compress options
			useStyles: true,
			useSharedStrings: true,
		})

		const fileType =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		const fileExtension = '.xlsx'

		const blob = new Blob([buffer], { type: fileType }) // creating blob with type.
		saveAs(blob, `template${fileExtension}`) // using file-saver exporting our template with styles

		if (shouldClearFields) {
			for (let i = 0; i < fieldsIndexes.length; i++) {
				localStorage.setItem(fieldsIndexes[i], '')
				localStorage.setItem(fieldsIndexes[i] + 'update-id', '')
			}
		}

		setGroupsKey((prev) => prev + 1)
		await dataApi.createMany(newGroups)
	}

	return (
		<Card sx={{ marginTop: '40px', alignItems: 'left' }} fullWidth>
			<Heading>
				<b>{title}</b>
			</Heading>
			<Text
				sx={{
					fontSize: '14px',
					color: '#3f51b5',
					letterSpacing: '1px',
				}}
				centered={true}
			>
				{pres
					? t('template.Template loaded successfully!')
					: t('template.Loading template...')}
			</Text>
			{groups.map((g) => (
				<TemplateGroup key={g.title + groupsKey} group={g} />
			))}
			<Accordion fullWidth={false} sx={{ alignItems: 'center' }}>
				<Checkbox
					checked={shouldClearFields}
					onChange={() => setShouldClearFields((prev) => !prev)}
				/>
				<Text sx={{ fontSize: '16px', height: '100%' }}>
					{t('template.Clear fields after upload?')}
				</Text>
			</Accordion>
			<PrimaryButton onClick={convertHandler} sx={{ width: '100%' }}>
				{t('template.Convert Template')}
			</PrimaryButton>
		</Card>
	)
}
