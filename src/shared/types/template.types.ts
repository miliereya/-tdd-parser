// Inputs
export interface IField {
	value: string
	index: string // uuid
}

export interface IGroup {
	title: string
	parentField: string
	fields: IField[]
}

// Cells
export interface ICellValue {
	value: string
	fieldIndex?: number
}

export interface ICell {
	index: string // CELL_1
	value: ICellValue[]
}


