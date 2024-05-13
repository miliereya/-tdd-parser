'use client'
import { Button, SxProps } from '@mui/material'
import { InputHTMLAttributes } from 'react'
import { TextError } from '../text'
import { useTranslation } from 'react-i18next'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	name: string
	error?: string
	extension?: string
	sx?: SxProps
}

export const FileInput = ({ name, error = '', sx, ...rest }: Props) => {
	const { t } = useTranslation()
	return (
		<>
			<Button
				variant='contained'
				sx={{ marginTop: '15px', fontSize: '20px', ...sx }}
			>
				<label htmlFor={name}>{t('Press to load')}</label>
			</Button>
			<input
				id={name}
				style={{
					display: 'none',
				}}
				type='file'
				{...rest}
			/>
			<TextError text={error} />
		</>
	)
}
