'use client'
import { Input } from '@/components/input'
import { INPUT_LIST } from '@/constants/input.constants'
import { useCallback, useEffect, useState } from 'react'
import { read, utils, writeFileXLSX } from 'xlsx'

export default function Home() {
	const [pres, setPres] = useState<any>([])

	/* Fetch and update the state once */
	useEffect(() => {
		;(async () => {
			const f = await (
				await fetch('https://sheetjs.com/pres.xlsx')
			).arrayBuffer()
			const wb = read(f) // parse the array buffer
			const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
			const data = utils.sheet_to_json(ws) // generate objects
			setPres(data) // update state
		})()
	}, [])

	/* get state data and export to XLSX */
	const exportFile = useCallback(() => {
		console.log(pres)
		const ws = utils.json_to_sheet(pres)
		const wb = utils.book_new()
		utils.book_append_sheet(wb, ws, 'Data')
		writeFileXLSX(wb, 'SheetJSReactAoO.xlsx')
	}, [pres])

	return (
		<div>
			{INPUT_LIST.map((input, index) => {
				return <Input key={index} index={index} title={input.title} />
			})}
			{/* <button onClick={exportFile}>Export XLSX</button> */}
		</div>
	)
}
