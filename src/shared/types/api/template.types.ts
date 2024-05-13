import { ICell, IGroup } from '..'

export interface ICreateTemplate {
	title: string
	cells: ICell[]
	groups: IGroup[]
	file: File
	fileType: string
}
