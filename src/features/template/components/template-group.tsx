'use client'

import { dataApi } from '@/shared/api'
import { IGroup, SearchDataResults } from '@/shared/types'
import { Accordion, Heading, PrimaryInput, Text } from '@/shared/ui'
import { Box } from '@mui/material'
import { useState } from 'react'
import { SearchResults } from './search-results'
import { IFieldInput } from '../lib/types'

interface Props {
	group: IGroup
}

export const TemplateGroup = ({ group }: Props) => {
	const { fields, parentField, title, withDb } = group

	const parentIndex = fields.find((f) => f.value === parentField)?.index ?? ''

	const [parentFieldValue, setParentFieldValue] = useState(
		parentIndex ? localStorage.getItem(parentIndex) ?? '' : ''
	)
	const [values, setValues] = useState<IFieldInput[]>(() =>
		fields.map(({ index }) => ({
			index,
			value: localStorage.getItem(index) || '',
		}))
	)

	const [isSearchResultsOpen, setSearchResultsOpen] = useState(false)
	const [searchResults, setSearchResults] = useState<SearchDataResults[]>([])
	const [isFocused, setFocused] = useState(false)

	const searchHandler = async (value: string) => {
		localStorage.setItem(parentIndex, value)
		localStorage.setItem(parentIndex + 'update-id', '')

		setParentFieldValue(value)

		if (withDb && value) {
			try {
				const results = await dataApi.search({ parentIndex, title, value })
				setSearchResults(results)
				setSearchResultsOpen(true)
				setFocused(true)
			} catch (e) {
				console.log(e)
			}
		}
	}

	const chooseResultHandler = (result: SearchDataResults) => {
		const { _id, fields, parentValue } = result

		setParentFieldValue(parentValue)
		setValues((prev) =>
			prev.map((v) => {
				const value = fields.find((f) => f.index === v.index)?.value
				return value ? { ...v, value } : v
			})
		)

		for (let i = 0; i < fields.length; i++) {
			const { index, value } = fields[i]
			setValue(value, index)
		}

		localStorage.setItem(parentIndex + 'update-id', _id)
		localStorage.setItem(parentIndex, parentValue)
	}

	const setValue = (value: string, index: string) => {
		setValues((prev) =>
			prev.map((f) => (index === f.index ? { ...f, value } : f))
		)
		localStorage.setItem(index, value)
	}

	return (
		<Box sx={{ width: '100%', marginTop: '20px' }}>
			<Text centered={false}>{title}</Text>
			<Accordion
				sx={{ marginTop: '15px', flexWrap: 'wrap', position: 'relative' }}
				gap='15px'
			>
				<PrimaryInput
					onChange={(e) => searchHandler(e.target.value)}
					value={parentFieldValue}
					label={parentField}
					onFocus={() => setFocused(true)}
					onBlur={() => setTimeout(() => setFocused(false), 150)}
				/>
				{searchResults.length !== 0 && isSearchResultsOpen && isFocused && (
					<SearchResults
						results={searchResults}
						chooseResult={chooseResultHandler}
						closeHandler={() => setSearchResultsOpen(false)}
					/>
				)}
				{fields.map(({ index, size, value }, i) =>
					value === parentField ? null : (
						<PrimaryInput
							id={index}
							key={value}
							sx={{ width: size === 'small' ? '272.5px' : '100%' }}
							onChange={(e) => setValue(e.target.value, index)}
							label={value}
							value={values.find((v) => v.index === index)?.value ?? ''}
						/>
					)
				)}
			</Accordion>
		</Box>
	)
}
