import { DATA_INPUT_LIST } from '@/constants/input.constants'
import { Input } from '../input'
import s from './converter.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { dataApi } from '@/api/data.api'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'

export const Converter = () => {
	const [key, setKey] = useState(0)
	const [pres, setPres] = useState<null | Workbook>(null)

	/* Fetch and update the state once */
	useEffect(() => {
		;(async () => {
			try {
				const wb = new Workbook() // create workBook.
				const file = await (await fetch('/template_1.xlsx')).arrayBuffer()
				await wb.xlsx.load(file) // load our template to our instance.
				setPres(wb) // set instance to state // we can use ref
			} catch (error) {
				console.log(error)
			}
		})()
	}, [])

	const convertHandler = async () => {
		const dataList = DATA_INPUT_LIST
		if (!pres) return

		pres.getWorksheet('Лоджистли')?.eachRow((r, n) => {
			r.eachCell((c) => {
				console.log(c.value)
				switch (c.value) {
					case 'CELL_1':
						const autoNum = document.getElementById(
							'Номер автомобіляНомер автомобіля'
						) as HTMLInputElement

						const autoMark = document.getElementById(
							'Номер автомобіляМарка, модель'
						) as HTMLInputElement
						c.value = `${autoMark.value ?? ''} ${autoNum.value ?? ''}`
						break
					case 'CELL_2':
						const trailerModel = document.getElementById(
							'Номер причіпаМарка, модель'
						) as HTMLInputElement

						const trailerNum = document.getElementById(
							'Номер причіпаНомер причіпа'
						) as HTMLInputElement

						c.value = `${trailerModel.value ?? ''} ${trailerNum.value ?? ''}`
						break
					case 'CELL_3':
						const carrier = document.getElementById(
							'ПеревізникПеревізник'
						) as HTMLInputElement

						const carrierEDRPOU = document.getElementById(
							'ПеревізникЄДРПОУ'
						) as HTMLInputElement

						c.value = `${carrier.value ?? ''}, ЄДРПОУ ${
							carrierEDRPOU.value ?? ''
						}`
						break
					case 'CELL_4':
						const driverLastName = document.getElementById(
							'Прізвище водіяПрізвище водія'
						) as HTMLInputElement

						const driverFirstName = document.getElementById(
							"Прізвище водіяІм'я, по батькові"
						) as HTMLInputElement

						const driverCard = document.getElementById(
							'Прізвище водіяПосвідчення водія'
						) as HTMLInputElement

						c.value = `${driverLastName.value ?? ''}. ${
							driverFirstName.value ?? ''
						}, ${driverCard.value}`
						break
					case 'CELL_5':
						const customer = document.getElementById(
							'ЗамовникЗамовник'
						) as HTMLInputElement

						const customerEDRPOU = document.getElementById(
							'ЗамовникЄДРПОУ'
						) as HTMLInputElement

						c.value = `${customer.value ?? ''}, ЄДРПОУ ${
							customerEDRPOU.value ?? ''
						}`
						break
					case 'CELL_6':
						const consignors = document.getElementById(
							'ВантажовідправникВантажовідправник'
						) as HTMLInputElement

						const consignorsEDRPOU = document.getElementById(
							'ВантажовідправникЄДРПОУ'
						) as HTMLInputElement

						const consignorsAddress = document.getElementById(
							'ВантажовідправникАдреса'
						) as HTMLInputElement
						c.value = `${consignors.value ?? ''}, ЄДРПОУ ${
							consignorsEDRPOU.value ?? ''
						}, ${consignorsAddress.value ?? ''}`
						break
					case 'CELL_7':
						const consignees = document.getElementById(
							'ВантажоодержувачВантажоодержувач'
						) as HTMLInputElement

						const consigneesEDRPOU = document.getElementById(
							'ВантажоодержувачЄДРПОУ'
						) as HTMLInputElement

						const consigneesAddress = document.getElementById(
							'ВантажоодержувачАдреса'
						) as HTMLInputElement
						c.value = `${consignees.value ?? ''}, ЄДРПОУ ${
							consigneesEDRPOU.value ?? ''
						}, ${consigneesAddress.value ?? ''}`
						break
					case 'CELL_8':
						const consignorsDestination = document.getElementById(
							'ВантажовідправникПункт навантаження'
						) as HTMLInputElement

						c.value = `${consignorsDestination.value ?? ''}`
						break
					case 'CELL_9':
						const consigneesDestination = document.getElementById(
							'ВантажоодержувачПункт розвантаження'
						) as HTMLInputElement
						console.log(consigneesDestination.value)
						c.value = `${consigneesDestination.value ?? ''}`
						break
					case 'CELL_10':
						const driverLastName2 = document.getElementById(
							'Прізвище водіяПрізвище водія'
						) as HTMLInputElement

						const driverFirstName2 = document.getElementById(
							"Прізвище водіяІм'я, по батькові"
						) as HTMLInputElement
						c.value = `${driverLastName2.value ?? ''} ${driverFirstName2.value}`
						break
					case 'CELL_11':
						const culture = document.getElementById(
							'Культура'
						) as HTMLInputElement

						c.value = `${culture.value ?? ''}`
						break
					case 'CELL_12':
						const consignorsPIB = document.getElementById(
							'ВантажовідправникПІБ відповідальної особи'
						) as HTMLInputElement

						const consignorsPosition = document.getElementById(
							'ВантажовідправникПосада'
						) as HTMLInputElement

						c.value = `${consignorsPIB.value ?? ''}, ${
							consignorsPosition.value
						}`
						break
					case 'CELL_13':
						const consigneesPIB = document.getElementById(
							'ВантажоодержувачПІБ відповідальної особи'
						) as HTMLInputElement

						const consigneesPosition = document.getElementById(
							'ВантажоодержувачПосада'
						) as HTMLInputElement

						c.value = `${consigneesPIB.value ?? ''}, ${
							consigneesPosition.value
						}`
						break
					case 'CELL_14':
						const autoVINCODE = document.getElementById(
							'Номер автомобіляВінкод'
						) as HTMLInputElement

						c.value = `${autoVINCODE.value ?? ''}`
						break
					case 'CELL_15':
						const autoYear = document.getElementById(
							'Номер автомобіляРік випуску'
						) as HTMLInputElement

						c.value = `${autoYear.value ?? ''}`
						break
					case 'CELL_16':
						const autoLength = document.getElementById(
							'Номер автомобіляДовжина (мм)'
						) as HTMLInputElement

						const trailerLength = document.getElementById(
							'Номер причіпаДовжина (мм)'
						) as HTMLInputElement

						c.value = `${autoLength.value ?? 0 + trailerLength.value ?? 0}`
						break
					case 'CELL_17':
						const autoWidth = document.getElementById(
							'Номер автомобіляШирина (мм)'
						) as HTMLInputElement

						const trailerWidth = document.getElementById(
							'Номер причіпаШирина (мм)'
						) as HTMLInputElement

						c.value = `${autoWidth.value ?? 0 + trailerWidth.value ?? 0}`
						break
					case 'CELL_18':
						const autoHeight = document.getElementById(
							'Номер автомобіляВисота (мм)'
						) as HTMLInputElement

						const trailerHeight = document.getElementById(
							'Номер причіпаВисота (мм)'
						) as HTMLInputElement

						c.value = `${autoHeight.value ?? 0 + trailerHeight.value ?? 0}`
						break
					case 'CELL_19':
						const autoWeightWithoutLoad = document.getElementById(
							'Номер автомобіляМаса без навантаження (т)'
						) as HTMLInputElement

						const trailerWeightWithoutLoad = document.getElementById(
							'Номер причіпаМаса без навантаження (т)'
						) as HTMLInputElement

						c.value = `${
							autoWeightWithoutLoad.value ??
							0 + trailerWeightWithoutLoad.value ??
							0
						}`
						break
					case 'CELL_20':
						const autoWeightWithLoad = document.getElementById(
							'Номер автомобіляПовна маса (т)'
						) as HTMLInputElement

						const trailerWeightWithLoad = document.getElementById(
							'Номер причіпаПовна маса (т)'
						) as HTMLInputElement

						c.value = `${
							autoWeightWithLoad.value ?? 0 + trailerWeightWithLoad.value ?? 0
						}`
						break
					case 'CELL_21':
						const number = document.getElementById('Номер') as HTMLInputElement

						const date = document.getElementById('Дата') as HTMLInputElement

						c.value = `${number.value ?? ''} ${date.value ?? ''}`
						break
				}
			})
		})
		pres.removeWorksheet(
			'Дунай-Транзитсервис'
		) /* example how we can manipulate with worksheets, 

		also a lot of methods such as eachRow, eachCell,
		 remember if you want to change some style -> need to made copy first reference - 
		  target-screen:  https://ibb.co/dDmLPSS;
		  link to resource : https://builtin.com/software-engineering-perspectives/exceljs; */

		const buffer = await pres.xlsx.writeBuffer({
			//create buffer with options --useStyles is expensive operation, also mb we need compress options
			useStyles: true,
			useSharedStrings: true,
		})

		const fileType =
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
		const fileExtension = '.xlsx'

		const blob = new Blob([buffer], { type: fileType }) // creating blob with type.
		saveAs(blob, `Лоджистли${fileExtension}`) // using file-saver exporting our template with styles

		await dataApi.createMany(
			dataList
				.filter((data) => !data.isSimpleInput)
				.map((data) => {
					const fields: any = {}
					for (let i = 0; i < data.data.length; i++) {
						const key = data.data[i]
						fields[key] = localStorage.getItem(data.parentField + key)
					}
					return {
						_id: localStorage.getItem(data.parentField + '_id') ?? undefined,
						table: data.table ?? 'cars',
						parentField: data.parentField,
						data: fields,
					}
				})
		)
		return
	}

	const clearHandler = () => {
		const dataList = DATA_INPUT_LIST

		for (let i = 0; i < dataList.length; i++) {
			const { data, parentField } = dataList[i]
			localStorage.setItem(parentField + '_id', '')
			for (let l = 0; l < data.length; l++) {
				localStorage.setItem(parentField + data[l], '')
			}
		}
		setKey((prev) => prev + 1)
	}

	return (
		<div className={s.wrapper} key={key}>
			{DATA_INPUT_LIST.map((input) => {
				const { data, parentField, isSimpleInput, table, title } = input

				return (
					<div key={parentField} className={s.data_item}>
						<p className={s.title}>{isSimpleInput ? parentField : title}</p>
						<div className={s.data_container}>
							{isSimpleInput ? (
								<Input index={parentField} />
							) : (
								data.map((d) => {
									return (
										<Input
											refresh={() => setKey((prev) => prev + 1)}
											key={parentField + d}
											index={parentField + d}
											parentField={parentField}
											title={d}
											isParentField={!isSimpleInput && parentField === d}
											table={table}
										/>
									)
								})
							)}
						</div>
					</div>
				)
			})}
			<button className={s.convert_button} onClick={convertHandler}>
				Завантажити XLSX
			</button>
			<button className={s.convert_button} onClick={clearHandler}>
				Очистити
			</button>
		</div>
	)
}
