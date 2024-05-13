interface ITableBase {
	table: string
}

export interface IData {
	_id: string
	parentField: string
	data: object
}

export interface ICreateData {
	parentIndex: string
	fields: { index: string; value: string }[]
	updateId?: string
}

export interface ISearchData {
	parentIndex: string
	value: string
	title: string
}

export interface IFullSearchData extends ITableBase {}

export interface IUpdateData extends ITableBase {
	_id: string
	parentField: string
	data: object
}

export interface IDeleteData extends ITableBase {
	_id: string
}
