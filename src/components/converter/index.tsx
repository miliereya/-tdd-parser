import { DATA_INPUT_LIST } from '@/constants/input.constants'
import { Input } from '../input'
import s from './converter.module.scss'
import { useState } from 'react'
import { dataApi } from '@/api/data.api'

export const Converter = () => {
	const [key, setKey] = useState(0)

	const convertHandler = async () => {
		const dataList = DATA_INPUT_LIST

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
