import { useHueChannel } from '@src/hooks/useColorPicker'
import { Container, RangeSlider } from './HueSlider.styled'
import { HueSliderProps } from './types'

export const HueSlider = (props: HueSliderProps) => {
	const [value, setValue] = useHueChannel()

	return (
		<Container>
			<RangeSlider
				{...props}
				type="range"
				min="0"
				max="359"
				step="1"
				value={value}
				onChange={(e) => setValue(+e.target.value)}
			/>
		</Container>
	)
}
