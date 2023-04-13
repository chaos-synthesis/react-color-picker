import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { Presets } from '../index'

export default {
	title: 'Components/Presets',
	component: Presets,
} as ComponentMeta<typeof Presets>

const Template: ComponentStory<typeof Presets> = (args) => (
	<ColorPickerProvider>
		<div style={{ width: 300 }}>
			<Presets {...args} />
		</div>
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = {}
