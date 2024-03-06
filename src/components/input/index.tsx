import s from './input.module.scss'
import { useLocalStorageState } from '@/hooks/useLocalStorageState'

interface InputProps {
	index: number
	title: string
}

export const Input = ({ index, title }: InputProps) => {
	const [value, setValue] = useLocalStorageState(String(index))

	return (
		<label className={s.label} htmlFor={title}>
			<p className={s.title}>{title}</p>
			<input
				name={title}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</label>
	)
}
