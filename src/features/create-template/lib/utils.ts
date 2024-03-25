import { Workbook } from 'exceljs'
import { ERROR_NO_WS } from '../config/error.config'

export const prepareCells = (cells: string[]) =>
	Array.from(new Set(cells)).sort((a, b) => +a.split('_')[1] - +b.split('_')[1])

export const extractCellsFromWB = (wb: Workbook) => {
	const cells: string[] = []
	const ws = wb.worksheets[0]
	if (!ws) throw ERROR_NO_WS

	ws.eachRow((r) => {
		r.eachCell((c) => {
			const val = c.value?.toString()
			if (val && val.startsWith('CELL_')) {
				cells.push(val)
			}
		})
	})

	return prepareCells(cells)
}
