import { TypeTable } from '@/types/data.types'

interface IData_Input {
	parentField: string
	data: string[]
	table?: TypeTable
	title?: string
	isSimpleInput?: boolean
}

export const DATA_INPUT_LIST: IData_Input[] = [
	{
		parentField: 'Номер автомобіля',
		data: [
			'Номер автомобіля',
			'Марка, модель',
			'Довжина',
			'Ширина',
			'Висота',
			'Маса без навантаження',
			'Повна маса',
			'Вінкод',
			'Рік випуску',
		],
		table: 'cars',
		title: 'Автомобiль',
	},
	{
		parentField: 'Номер причіпа',
		data: [
			'Номер причіпа',
			'Марка, модель',
			'Довжина',
			'Ширина',
			'Висота',
			'Маса без навантаження',
			'Повна маса',
		],
		table: 'trailers',
		title: 'Причiп',
	},
	{
		parentField: 'Перевізник',
		data: ['Перевізник', 'ЄДРПОУ'],
		table: 'carriers',
		title: 'Перевізник',
	},
	{
		parentField: 'Прізвище водія',
		data: ['Прізвище водія', "Ім'я, по батькові", 'Посвідчення водія'],
		table: 'drivers',
		title: 'Водiй',
	},
	{
		parentField: 'Замовник',
		data: ['Замовник', 'ЄДРПОУ'],
		table: 'customers',
		title: 'Замовник',
	},
	{
		parentField: 'Вантажовідправник',
		data: [
			'Вантажовідправник',
			'ЄДРПОУ',
			'Адреса',
			'Пункт навантаження',
			'ПІБ відповідальної особи',
			'Посада',
		],
		table: 'consignors',
		title: 'Вантажовідправник',
	},
	{
		parentField: 'Вантажоодержувач',
		data: [
			'Вантажовідправник',
			'ЄДРПОУ',
			'Адреса',
			'Пункт навантаження',
			'ПІБ відповідальної особи',
			'Посада',
		],
		table: 'consignees',
		title: 'Вантажоодержувач',
	},
	{
		parentField: 'Номер',
		data: ['Номер'],
		isSimpleInput: true,
	},
	{
		parentField: 'Дата',
		data: ['Дата'],
		isSimpleInput: true,
	},
	{
		parentField: 'Культура',
		data: ['Культура'],
		isSimpleInput: true,
	},
]
