export type TypeFieldSize = 'small' | 'large'
export type TypeOperation = '+' | '-' | '*' | '/' | '>' | '<'
export type TypeCellValue = 'separator' | 'input' | TypeOperation

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
	values: ICellValue[]
}

export interface ITemplate {
	_id: string
	email: string
	filePath: string
	title: string
	cells: ICell[]
	groups: IGroup[]
}
