import { useMemo } from 'react'
import tinycolor from 'tinycolor2'
import { Container, PresetItem, PresetsBox, PreviewBox } from '@src/components/presets/Presets.styled'
import { useTinycolor } from '@src/hooks/useColorPicker'

export interface PresetsProps {
	items?: string[]
	rows?: number
}

export const Presets = ({ items = defaultPresets, rows = 2 }: PresetsProps) => {
	const [value, setValue] = useTinycolor()
	const presetItemWidth = `${(100 / items?.length - 1) * rows}%`

	const complementColors = useMemo(
		() => items.map((colorStr) => tinycolor(colorStr).complement().setAlpha(0.2).toHex8String()),
		[items]
	)

	return (
		<Container>
			<PreviewBox background={value.toHex8String()} />

			<PresetsBox>
				{items.map((p, idx) => (
					<PresetItem
						key={p}
						width={presetItemWidth}
						background={p}
						border={`0.5px solid ${complementColors[idx]}`}
						onClick={() => setValue(tinycolor(p))}
					/>
				))}
			</PresetsBox>
		</Container>
	)
}

const defaultPresets = [
	'rgba(128,128,128, 1)',
	'rgba(192,192,192, 1)',
	'rgba(0,0,255,1)',
	'rgba(0,128,0,1)',
	'rgba(128,128,0, 1)',
	'rgba(0,255,0, 1)',
	'rgba(128,0,128, 1)',
	'rgba(175, 51, 242, 1)',
	'rgba(240, 103, 46, 1)',
	'rgba(255,255,0, 1)',
]
