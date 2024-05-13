export type TypeCreateTemplateState =
	| 'waiting for file'
	| 'loading data'
	| 'loaded file'
	| 'chaining cells'
	| 'titling template'

export type TypeCellInput = 'operation' | 'input' | null
