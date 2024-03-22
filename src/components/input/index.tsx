import { IData } from '@/shared/types/api/data.types'
import s from './input.module.scss'
import { useLocalStorageState } from '@/shared/hooks/useLocalStorageState'
import { useEffect, useState } from 'react'
import { dataApi } from '@/shared/api'

interface InputProps {
	index: string
	title?: string
	table?: string
	isParentField?: boolean
	parentField?: string
	refresh?: () => void
}

export const Input = ({
	index,
	title,
	isParentField,
	table,
	parentField,
	refresh,
}: InputProps) => {
	const { value, setValue } = useLocalStorageState(index)
	const [results, setResults] = useState<IData[]>([])
	const [isFocused, setFocused] = useState(false)

	useEffect(() => {
		const fetchResults = async () => {
			if (!isParentField || !title || !table || !value) return

			const data = await dataApi.search({ parentField: title, table, value })
			setResults(data)
		}
		fetchResults()
	}, [value, table, title, isParentField])

	const setDataHandler = (i: number, res: string) => {
		if (!refresh) return
		const data = Object.entries(results[i].data)

		for (let i = 0; i < data.length; i++) {
			const key = data[i][0]
			const value = data[i][1]
			localStorage.setItem(parentField + key, value)
		}
		localStorage.setItem(parentField + '_id', results[i]._id)
		setValue(res)
		refresh()
	}
	console.log(index)

	return (
		<label className={s.label} htmlFor={title}>
			{title && <p className={s.title}>{title}</p>}
			<input
				onFocus={() => setFocused(true)}
				onBlur={() => setTimeout(() => setFocused(false), 150)}
				name={title}
				value={value ?? ''}
				onChange={(e) => setValue(e.target.value)}
				id={index}
				style={
					title === 'Пункт навантаження' ||
					title === 'Пункт розвантаження' ||
					title === 'Замовник' ||
					title === 'Перевізник' ||
					title === 'Вантажовідправник' ||
					title === 'Вантажоодержувач'
						? { width: '1200px' }
						: {}
				}
			/>
			{isFocused && results.length !== 0 && (
				<div className={s.results}>
					{results.length &&
						results
							.map((r: any) => r.data[r.parentField])
							.map((r, i) => (
								<button onClick={() => setDataHandler(i, r)} key={r + i}>
									{r}
								</button>
							))}
				</div>
			)}
		</label>
	)
}
