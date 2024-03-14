import { IData, TypeTable } from '@/types/data.types'
import s from './search-results.module.scss'
import { dataApi } from '@/api/data.api'
import { Dispatch, SetStateAction, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import editIcon from '/public/icons/edit.png'
import acceptIcon from '/public/icons/accept.png'
import deleteIcon from '/public/icons/delete.png'
import cancelIcon from '/public/icons/cancel.png'

interface SearchResultsProps {
	results: IData[]
	table: TypeTable
	matchers: RegExp[]
}

export const SearchResults = ({
	results,
	table,
	matchers,
}: SearchResultsProps) => {
	return (
		<div className={s.wrapper}>
			{results.length ? (
				results.map((r) => {
					return <Result matchers={matchers} key={r._id} table={table} r={r} />
				})
			) : (
				<p className={s.nwf_text}>Нічого не знайдено</p>
			)}
		</div>
	)
}

interface ResultProps {
	r: IData
	table: TypeTable
	matchers: RegExp[]
}

const Result = ({ r, table, matchers }: ResultProps) => {
	const [objA, setObjA] = useState(Object.entries(r.data))

	const _id = r._id

	const router = useRouter()

	const updateHandler = async () => {
		const newData: { [key: string]: number | string } = {}
		for (let i = 0; i < objA.length; i++) {
			const key = objA[i][0]
			const value = objA[i][1]
			newData[key] = value
		}

		try {
			await dataApi.update({
				_id,
				table,
				data: newData,
				parentField: objA[0][0],
			})
			alert('Оновлено!')
			router.refresh()
		} catch (e) {
			alert('Помилка, запис не оновлено')
		}
	}

	const deleteHandler = async () => {
		try {
			await dataApi.delete({ _id, table })
			alert('Запис видалено!')
			router.refresh()
		} catch (e) {
			alert('Помилка, запис не видалено')
		}
	}

	const changeValueHandler = (isKey: boolean, index: number, value: string) => {
		setObjA((objA) => {
			objA[index][isKey ? 0 : 1] = value
			return objA
		})
	}

	return (
		<div key={r._id} className={s.data_wrapper}>
			<table>
				<tbody>
					{objA.map((field, index) => {
						const key = field[0]
						const value = field[1]

						if (key === '_id' || key === 'parentField') return

						return (
							<tr key={key}>
								<td className={s.input_key}>
									<input
										defaultValue={key}
										type='text'
										onChange={(e) =>
											changeValueHandler(true, index, e.target.value)
										}
									/>
								</td>

								<td className={s.input_value}>
									<input
										defaultValue={value}
										type='text'
										onChange={(e) =>
											changeValueHandler(false, index, e.target.value)
										}
										style={{
											background: matchers.some((matcher) =>
												matcher.test(value)
											)
												? '#0f0'
												: 'none',
											width: '100%',
										}}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<table className={s.table}>
				<tbody>
					{objA.map((field, index) => {
						const key = field[0]
						const value = field[1]

						if (key === '_id' || key === 'parentField') return

						return (
							<tr key={key}>
								<td className={s.input_key}>
									<input
										defaultValue={key}
										type='text'
										onChange={(e) =>
											changeValueHandler(true, index, e.target.value)
										}
									/>
								</td>

								<td className={s.input_value}>
									<input
										defaultValue={value}
										type='text'
										onChange={(e) =>
											changeValueHandler(false, index, e.target.value)
										}
										style={{
											background: matchers.some((matcher) =>
												matcher.test(value)
											)
												? '#0f0'
												: 'none',
											width: '100%',
										}}
									/>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			<div className={s.button_wrapper}>
				<button className={s.button} onClick={updateHandler}>
					<Image className={s.icon} alt='accept' src={acceptIcon} />
				</button>

				<button className={s.button} onClick={deleteHandler}>
					<Image className={s.icon} alt='delete' src={deleteIcon} />
				</button>
			</div>
		</div>
	)
}
