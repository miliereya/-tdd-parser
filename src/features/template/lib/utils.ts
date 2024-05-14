import { ICell, IGroup } from '@/shared/types'
import { Row } from 'exceljs'

export const fillCells = (rows: Row, cells: ICell[]) => {
	rows.eachCell((c) => {
		if (!c.value?.toString().startsWith('CELL_')) return

		const val = cells.find(({ index }) => index === c.value)
		const values = val?.values

		if (values) {
			let input = ''

			for (let i = 0; i < values.length; i++) {
				const { type, value, fieldIndex } = values[i]
				if (!value) continue

				switch (type) {
					case 'separator':
						value === '(space)' ? (input += ' ') : (input += value)
						break
					case 'input':
						if (fieldIndex && !Array.isArray(fieldIndex)) {
							input += localStorage.getItem(fieldIndex) ?? ''
						}
						break
					case '+':
						{
							const numbers = value.split('|')
							input += String(
								Number(localStorage.getItem(numbers[0]) ?? 0) +
									Number(localStorage.getItem(numbers[1]) ?? 0)
							)
						}
						break
					case '-':
						{
							const numbers = value.split('|')
							input += String(
								Number(localStorage.getItem(numbers[0]) ?? 0) -
									Number(localStorage.getItem(numbers[1]) ?? 0)
							)
						}
						break
					case '*':
						{
							const numbers = value.split('|')
							input += String(
								Number(localStorage.getItem(numbers[0]) ?? 0) *
									Number(localStorage.getItem(numbers[1]) ?? 0)
							)
						}
						break
					case '/':
						{
							const numbers = value.split('|')
							input += String(
								Number(localStorage.getItem(numbers[0]) ?? 0) /
									Number(localStorage.getItem(numbers[1]) ?? 0)
							)
						}
						break
					case '<':
						{
							const numbers = value.split('|')
							const num1 = Number(localStorage.getItem(numbers[0]) ?? 0)
							const num2 = Number(localStorage.getItem(numbers[1]) ?? 0)
							input += String(num1 < num2 ? num1 : num2)
						}
						break
					case '>':
						{
							const numbers = value.split('|')
							const num1 = Number(localStorage.getItem(numbers[0]) ?? 0)
							const num2 = Number(localStorage.getItem(numbers[1]) ?? 0)
							input += String(num1 > num2 ? num1 : num2)
						}
						break
				}
			}
			c.value = input
		}
	})
}

export const prepareGroups = (groups: IGroup[]) =>
	groups
		.filter(({ withDb, parentField, fields }) => {
			const parentValue = fields.find((f) => f.value === parentField)?.index
			return withDb && parentValue && localStorage.getItem(parentValue)
		})
		.map(({ parentField, fields, title }) => ({
			updateId:
				localStorage.getItem(
					(fields.find((f) => f.value === parentField)?.index ?? '') +
						'update-id'
				) ?? undefined,
			parentIndex: fields.find((f) => f.value === parentField)?.index ?? '',
			title,
			fields: fields.map(({ index }) => ({
				index,
				value: localStorage.getItem(index) || '',
			})),
		}))
