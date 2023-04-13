import { CSSProperties, InputHTMLAttributes } from 'react'

export interface InputsProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	width?: string
	borderRadius?: string
	border?: string
	containerStyle?: CSSProperties
	value: string | ReadonlyArray<string> | number
	onChangeValue: (val: string | number) => void
}
