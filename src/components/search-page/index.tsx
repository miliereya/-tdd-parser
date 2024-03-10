'use client'

import { useEffect, useState } from 'react'
import { SearchResults } from '../search-results'
import s from './search-page.module.scss'
import { dataApi } from '@/api/data.api'
import { IData, TypeTable } from '@/types/data.types'

interface SearchPageProps {
	title: string
	table: TypeTable
	data: IData[]
}

export const SearchPage = ({ title, table, data }: SearchPageProps) => {
	const [value, setValue] = useState('')
	const [results, setResults] = useState(data)
	const [matchers, setMatchers] = useState<RegExp[]>([])

	useEffect(() => {
		setMatchers(
			value
				.split(' ')
				.filter((val) => val)
				.map((val) => new RegExp(val))
		)
	}, [value])

	useEffect(() => {
		if (matchers.length) {
			setResults(
				data.filter((ent) =>
					Object.entries(ent.data).some((val) =>
						matchers.some((matcher) => matcher.test(val[1]))
					)
				)
			)
		}
	}, [data, matchers, value])

	return (
		<div className={s.wrapper}>
			<p className={s.title}>{title}</p>
			<input
				maxLength={50}
				value={value}
				onChange={(e) => {
					console.log()
					setValue(e.target.value)
				}}
				placeholder='Почніть вводити слово...'
				className={s.input}
			/>
			<p className={s.quantity}>
				Показано записів: <span>{results.length}</span>
			</p>
			<SearchResults matchers={matchers} table={table} results={results} />
		</div>
	)
}
