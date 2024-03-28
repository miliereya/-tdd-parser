import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { Cell } from './cell'
import { IGroup } from '@/shared/types'
import { Dispatch, SetStateAction } from 'react'
import { TypeCreateTemplateState } from '..'

interface Props {
	cells: string[]
	groups: IGroup[]
	setCurrentState: Dispatch<SetStateAction<TypeCreateTemplateState>>
}

export const ChainCells = ({ cells, groups, setCurrentState }: Props) => {
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
					{cells.map((с) => {
						return <Cell groups={groups} cell={с} key={с} />
					})}
				</Paper>
			</Box>
		</>
	)
}
