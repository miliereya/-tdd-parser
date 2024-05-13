import { ICell } from '@/shared/types'

export interface IOperationValue {
	title: string
	value: string
	fieldIndex: string
}

export interface IEditingCell {
	cell: ICell
	isSaved: boolean
}
