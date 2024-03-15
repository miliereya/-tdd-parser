'use client'

import { Converter } from '@/components/converter'
import { ROUTER_CONSTANTS } from '@/constants/router.constants'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'


export default function Home() {
	const [pres, setPres] = useState<any>([])

	/* Fetch and update the state once */

	/* get state data and export to XLSX */
	// const exportFile = useCallback(() => {
	// 	const ws = utils.json_to_sheet(pres)
	// 	const wb = utils.book_new()
	// 	utils.book_append_sheet(wb, ws, 'Data')
	// 	writeFileXLSX(wb, 'SheetJSReactAoO.xlsx')
	// }, [pres])

	return (
		<>
			<Converter />
		</>
	)
}
