import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import tinycolor from 'tinycolor2'
import {
	useAlphaChannel,
	useBlueChannel,
	useBrightnessChannel,
	useGreenChannel,
	useHslSaturationChannel,
	useHsvSaturationChannel,
	useHueChannel,
	useLightnessChannel,
	useRedChannel,
	useTinycolor,
} from '@src/hooks/useColorPicker'
import { useStore$ } from '@src/hooks/useStore'
import { ChannelInput, ChannelInputLabel, Container, InputBox } from './Inputs.styled'
import { InputsProps } from './types'

export const Input = ({ label, containerStyle, onChangeValue, onChange, ...rest }: InputsProps) => {
	const handleKeyDown = (e) => {
		if (rest.type !== 'number') return
		if ([',', '.'].includes(e.key)) return e.preventDefault()
		switch (e.key) {
			case 'ArrowUp':
				onChangeValue(+rest.value + 1)
				e.preventDefault()
				break
			case 'ArrowDown':
				onChangeValue(+rest.value - 1)
				e.preventDefault()
				break
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onChangeValue(e.target.value)
		onChange?.(e)
	}

	return (
		<InputBox style={containerStyle}>
			<ChannelInput onKeyDown={handleKeyDown} {...rest} onChange={handleChange} type="text" />
			<ChannelInputLabel>{label}</ChannelInputLabel>
		</InputBox>
	)
}

const useChangeCallback = (fn: () => ReturnType<typeof useStore$<number>>, max = 255, min = 0) => {
	const [value, setValue] = fn()

	const onChangeValue = useCallback(
		(val: string | number) => {
			let newValue = +val
			if (newValue > max) newValue = max
			else if (newValue < min) newValue = min
			setValue(newValue)
		},
		[max, min]
	)

	return { value, onChangeValue }
}

export const OpacityChannelInput = () => {
	const inputProps = useChangeCallback(useAlphaChannel, 100)

	return <Input label="A" {...inputProps} type="number" max={100} />
}

const hexColorRegexp = /[0-9a-f]{1,6}/i
export const HexInput = () => {
	const [color, setColor] = useTinycolor()
	const [value, setValue] = useState(color.toHex())

	const handleChange = useCallback(
		(val?: string | number) => {
			const normalizedValue =
				hexColorRegexp
					.exec((val as string) ?? '')
					?.at(0)
					?.toUpperCase() ?? ''
			setValue(normalizedValue)

			if (normalizedValue.length < 6) return
			const tinyColor = tinycolor(normalizedValue)
			if (tinyColor.isValid()) {
				tinyColor.setAlpha(color.getAlpha())
				setColor(tinyColor)
			}
		},
		[color]
	)

	useEffect(() => {
		const newValue = color.toHex().toUpperCase()
		setValue((prev) => {
			if (prev === newValue || newValue.startsWith(prev)) return prev
			return newValue
		})
	}, [color])

	return <Input label="HEX" value={value} onChangeValue={handleChange} containerStyle={{ width: '25%' }} />
}

export const RGBInputs = () => {
	const inputRedProps = useChangeCallback(useRedChannel)
	const inputGreenProps = useChangeCallback(useGreenChannel)
	const inputBlueProps = useChangeCallback(useBlueChannel)

	return (
		<>
			<Input label="R" {...inputRedProps} type="number" />
			<Input label="G" {...inputGreenProps} type="number" />
			<Input label="B" {...inputBlueProps} type="number" />
		</>
	)
}

export const HSVInputs = () => {
	const inputHueProps = useChangeCallback(useHueChannel, 360)
	const inputSaturationProps = useChangeCallback(useHsvSaturationChannel, 100)
	const inputBrightnessProps = useChangeCallback(useBrightnessChannel, 100)

	return (
		<>
			<Input label="H" {...inputHueProps} type="number" min={0} max={360} />
			<Input label="S" {...inputSaturationProps} type="number" min={0} max={100} />
			<Input label="V" {...inputBrightnessProps} type="number" min={0} max={100} />
		</>
	)
}

export const HSLInputs = () => {
	const inputHueProps = useChangeCallback(useHueChannel, 360)
	const inputSaturationProps = useChangeCallback(useHslSaturationChannel, 100)
	const inputLightnessProps = useChangeCallback(useLightnessChannel, 100)

	return (
		<>
			<Input label="H" {...inputHueProps} type="number" min={0} max={360} />
			<Input label="S" {...inputSaturationProps} type="number" min={0} max={100} />
			<Input label="L" {...inputLightnessProps} type="number" min={0} max={100} />
		</>
	)
}

export interface ChannelInputsProps {
	inputType: 'rgb' | 'hsl' | 'hsv' | 'cmyk'
}

export function ChannelInputs({ inputType }: ChannelInputsProps) {
	return (
		<Container>
			{inputType !== 'cmyk' && <HexInput />}
			{inputType === 'hsl' && <HSLInputs />}
			{inputType === 'rgb' && <RGBInputs />}
			{inputType === 'hsv' && <HSVInputs />}
			{/*{inputType === 'cmyk' && <CMKYInputs />}*/}
			<OpacityChannelInput />
		</Container>
	)
}
