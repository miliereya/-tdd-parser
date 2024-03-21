'use client'

import { Workbook } from 'exceljs'
import { LegacyRef, useEffect, useRef, useState } from 'react'

// Inputs
interface IField {
	value: string
	index: number // uuid
}

interface IGroup {
	title: string
	parentField: string
	fields: IField[]
}

// Cells
interface ICellValue {
	value: string
	fieldIndex?: number
}

interface ICell {
	index: string // CELL_1
	value: ICellValue[]
}

export const CreateTemplatePage = () => {
	const [pres, setPres] = useState<null | Workbook>(null)
	const fileRef = useRef<any>()

	const [groups, setGroups] = useState<IGroup[]>([])

	const [groupTitle, setGroupTitle] = useState('')
	const [groupParentField, setGroupParentField] = useState('')

	const [inputs, setInputs] = useState<string[]>([])

	const loadHandler = async () => {
		try {
			if (!fileRef.current) return
			const wb = new Workbook() // create workBook.

			// const file = await (await fetch('/template_1.xlsx')).arrayBuffer()
			const file = await fileRef.current.files[0].arrayBuffer()
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

			setInputs(Array.from(new Set(cells)).sort())
		} catch (error) {
			console.log(error)
		}
	}

	const addGroupHandler = () => {
		setGroups((prev) => [
			...prev,
			{ title: groupTitle, parentField: groupParentField, fields: [] },
		])
	}

	return (
		<div style={{ padding: '300px' }}>
			<input type='file' ref={fileRef} />
			<button onClick={loadHandler}>Load</button>
			{inputs.map((i) => {
				return (
					<div key={i + new Date()}>
						<p>{i}</p>
					</div>
				)
			})}
			<br />
			<br />
			<br />
			<br />
			{groups.map((i) => {
				const { fields, parentField, title } = i
				return (
					<div key={parentField}>
						<p>{title}</p>
						<p>parent field: {parentField}</p>
						{fields.map((f) => {
							return (
								<div key={f.value + new Date()}>
									<p>{f.value}</p>
									<input type='text' />
								</div>
							)
						})}
					</div>
				)
			})}
			<p>Group title</p>
			<input
				onChange={(e) => setGroupTitle(e.target.value)}
				type='text'
				value={groupTitle}
				style={{ border: '2px solid gray' }}
			/>
			<p>Group parent</p>
			<input
				onChange={(e) => setGroupParentField(e.target.value)}
				type='text'
				value={groupParentField}
				style={{ border: '2px solid gray' }}
			/>

			<button style={{ border: '2px solid gray' }} onClick={addGroupHandler}>
				addGroupHandler
			</button>
		</div>
	)
}
