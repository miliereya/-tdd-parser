import { SxProps, TextField } from '@mui/material'

interface Props {
	sx?: SxProps
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	value?: string
	label?: string
	disabled?: boolean
	filled?: boolean
	defaultValue?: string
	type?: string
	id?: string
	onFocus?: () => void
	onBlur?: () => void
}

export const PrimaryInput = ({
	value,
	onChange,
	label,
	filled = false,
	disabled,
	defaultValue,
	type = 'text',
	sx,
	id,
	onBlur,
	onFocus,
}: Props) => {
	return (
		<TextField
			size='small'
			variant={filled ? 'filled' : 'outlined'}
			sx={{ width: '100%', ...sx }}
			label={label}
			onChange={onChange}
			value={value}
			disabled={disabled}
			defaultValue={defaultValue}
			type={type}
			id={id}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	)
}
