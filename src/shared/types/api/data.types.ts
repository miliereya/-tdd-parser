interface ITableBase {
	table: string
}

export interface IData {
	_id: string
	parentField: string
	data: object
}

export interface ICreateData extends ITableBase {
	parentField: string
	data: object
}

export interface ICreateManyData {
	data: ({ _id?: string } & ICreateData)[]
}

export interface ISearchData extends ITableBase {
	parentField: string
	value: string
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
