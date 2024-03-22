'use client'

import { InputGroup } from '@/components/createTemplate/InputGroup'
import { Cell } from '@/components/createTemplate/Cell'
import { IField, IGroup } from '@/types/input.types'
import { Box, Button, Stack, TextField } from '@mui/material'
import { Workbook } from 'exceljs'
import { ChangeEvent, useState } from 'react'

export const CreateTemplatePage = () => {
	const [pres, setPres] = useState<null | Workbook>(null)

	const [groups, setGroups] = useState<IGroup[]>([])

	const [groupTitle, setGroupTitle] = useState('')
	const [groupParentField, setGroupParentField] = useState('')

	const [cells, setCells] = useState<string[]>([])

	const loadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		try {
			if (!e.target.files) return
			const wb = new Workbook() // create workBook.

			// const file = await (await fetch('/template_1.xlsx')).arrayBuffer()
			const file = await e.target.files[0].arrayBuffer()
			await wb.xlsx.load(file) // load our template to our instance.
			setPres(wb) // set instance to state // we can use ref
			const cells: string[] = []
			wb.getWorksheet('Лоджистли')?.eachRow((r, n) => {
				r.eachCell((c) => {
					const val = c.value?.toString()
					if (val && val.startsWith('CELL_')) {
						cells.push(val)
					}
				})
			})

			setCells(
				Array.from(new Set(cells)).sort(
					(a, b) => +a.split('_')[1] - +b.split('_')[1]
				)
			)
		} catch (error) {
			console.log(error)
		}
	}

	const addGroupHandler = () => {
		if (!groupParentField || !groupTitle) return
		setGroups((prev) => [
			...prev,
			{ title: groupTitle, parentField: groupParentField, fields: [] },
		])
	}

	const handleSave = (fields: IField[], title: string) => {
		setGroups((groups) =>
			groups.map((group) =>
				group.title === title ? { ...group, fields: fields } : group
			)
		)
	}

	return (
		<div
			style={{
				height: '100%',
				width: '100%',
				paddingBlock: '20px',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<TextField
				size='small'
				sx={{ maxWidth: '250px' }}
				type='file'
				onChange={loadHandler}
			/>
			<Box
				sx={{
					display: 'grid',
					width: '100%',
					maxWidth: '800px',
					marginInline: 'auto',
					gap: '10px',
					gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
				}}
			>
				{cells.map((i) => {
					return <Cell options={groups} cell={i} key={i + new Date()} />
				})}
			</Box>
			<br />
			<br />
			{groups.map((group) => (
				<InputGroup saveHandler={handleSave} key={group.title} {...group} />
			))}
			<Stack spacing={2}>
				<TextField
					size='small'
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

				<Button variant='contained' onClick={addGroupHandler}>
					add group
				</Button>
			</Stack>
		</div>
	)
}
