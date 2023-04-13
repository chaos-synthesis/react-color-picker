import { ColorInput, Instance } from 'tinycolor2'
import { ColorBox } from '@src/components/colorBox'
import { EyeDropper } from '@src/components/eyeDropper'
import { HueSlider } from '@src/components/hueSlider'
import { ChannelInputs, ChannelInputsProps } from '@src/components/inputs'
import { OpacitySlider } from '@src/components/opacitySlider'
import { Presets } from '@src/components/presets/Presets'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'

export interface ColorPickerProps {
	value?: ColorInput
	onChange?: (color: Instance) => void
	inputType?: ChannelInputsProps['inputType'] | false
	presets?: string[]
}

export const ColorPicker = ({ value, onChange, inputType = 'rgb', presets }: ColorPickerProps) => {
	return (
		<ColorPickerProvider color={value} onChange={onChange}>
			<div style={{ width: 300, margin: '0 auto' }}>
				<ColorBox width={300} height={300} />

				<div style={{ display: 'flex' }}>
					<EyeDropper size={24} />

					<div style={{ margin: '14px 0', flexGrow: 1 }}>
						<HueSlider style={{ marginBottom: 12 }} />
						<OpacitySlider />
					</div>
				</div>

				{inputType && <ChannelInputs inputType={inputType} />}

				<Presets items={presets} />
			</div>
		</ColorPickerProvider>
	)
}
