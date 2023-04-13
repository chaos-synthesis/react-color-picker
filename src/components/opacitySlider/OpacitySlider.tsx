import { useAlphaChannel, useHexStringColor } from '@src/hooks/useColorPicker'
import { Chessboard, Container, RangeSlider } from './OpacitySlider.styled'
import { OpacitySliderProps } from './types'

export const OpacitySlider = (props: OpacitySliderProps) => {
	const [value, setValue] = useAlphaChannel()
	const [background] = useHexStringColor()

	return (
		<Container>
			<Chessboard {...props} />
			<RangeSlider
				backgroundColor={background}
				{...props}
				type="range"
				min="0"
				max="100"
				step="1"
				value={value}
				onChange={(e) => setValue(+e.target.value)}
			/>
		</Container>
	)
}
