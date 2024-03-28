export type TypeFieldSize = 'small' | 'large'
export type TypeCellValue = 'separator' | 'input' | '+' | '-' | '*' | '/'

// Inputs
export interface IField {
	value: string
	index: string // uuid
	size: TypeFieldSize
}

export interface IGroup {
	title: string
	parentField: string
	withDb: boolean
	isSaved: boolean
	fields: IField[]
}

// Cells
export interface ICellValue {
	value: string
	type: TypeCellValue
	title?: string
	fieldIndex?: string | string[]
}

export interface ICell {
	index: string // CELL_1
	value: ICellValue[]
}
