import { Box, Paper, Typography } from '@mui/material'
import { useState } from 'react'
import { Cell } from './cell'
import { Group } from 'next/dist/shared/lib/router/utils/route-regex'
import { IGroup } from '@/shared/types'

interface Props {
	cells: string[]
	groups: IGroup[]
}

export const ChainCells = ({ cells, groups }: Props) => {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					marginTop: '40px',
				}}
			>
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						position: 'relative',
						gap: '20px',
						padding: '25px 0px 45px',
						margin: '0 20px',
						width: '1000px',
						inset: 0,
					}}
					elevation={4}
				>
					<Typography variant='h4'>Chain Cells</Typography>
					{cells.map((i) => {
						return <Cell groups={groups} cell={i} key={i + new Date()} />
					})}
				</Paper>
			</Box>
		</>
	)
}
