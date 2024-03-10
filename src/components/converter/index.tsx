import { DATA_INPUT_LIST } from '@/constants/input.constants'
import { Input } from '../input'
import s from './converter.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { dataApi } from '@/api/data.api'
import { read, utils, writeFileXLSX } from 'xlsx'

export const Converter = () => {
	const [key, setKey] = useState(0)
	const [pres, setPres] = useState<any>([])

	/* Fetch and update the state once */
	useEffect(() => {
		;(async () => {
			const f = await (await fetch('/template.xlsx')).arrayBuffer()
			const wb = read(f) // parse the array buffer
			const ws = wb.Sheets[wb.SheetNames[0]] // get the first worksheet
			const data = utils.sheet_to_json(ws) // generate objects
			setPres(data) // update state
			console.log(data)
		})()
	}, [])

	const convertHandler = async () => {
		const dataList = DATA_INPUT_LIST

		const ws = utils.json_to_sheet(pres)
		const wb = utils.book_new()
		utils.book_append_sheet(wb, ws)
		writeFileXLSX(wb, 'title.xlsx')

		await dataApi.createMany(
			dataList
				.filter((data) => !data.isSimpleInput)
				.map((data) => {
					const fields: any = {}
					for (let i = 0; i < data.data.length; i++) {
						const key = data.data[i]
						fields[key] = localStorage.getItem(data.parentField + key)
					}
					return {
						_id: localStorage.getItem(data.parentField + '_id') ?? undefined,
						table: data.table ?? 'cars',
						parentField: data.parentField,
						data: fields,
					}
				})
		)

		for (let i = 0; i < dataList.length; i++) {
			const { data, parentField } = dataList[i]
			localStorage.setItem(parentField + '_id', '')
			for (let l = 0; l < data.length; l++) {
				localStorage.setItem(parentField + data[l], '')
			}
		}
		setKey((prev) => prev + 1)
	}

	return (
		<div className={s.wrapper} key={key}>
			{DATA_INPUT_LIST.map((input) => {
				const { data, parentField, isSimpleInput, table, title } = input

				return (
					<div key={parentField} className={s.data_item}>
						<p className={s.title}>{isSimpleInput ? parentField : title}</p>
						<div className={s.data_container}>
							{isSimpleInput ? (
								<Input index={parentField} />
							) : (
								data.map((d) => {
									return (
										<Input
											refresh={() => setKey((prev) => prev + 1)}
											key={parentField + d}
											index={parentField + d}
											parentField={parentField}
											title={d}
											isParentField={!isSimpleInput && parentField === d}
											table={table}
										/>
									)
								})
							)}
						</div>
					</div>
				)
			})}
			<button className={s.convert_button} onClick={convertHandler}>
				Завантажити XLSX
			</button>
		</div>
	)
}
