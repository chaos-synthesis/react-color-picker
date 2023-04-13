import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { HueSlider } from '../index'

export default {
	title: 'Components/HueSlider',
	component: HueSlider,
} as ComponentMeta<typeof HueSlider>

const Template: ComponentStory<typeof HueSlider> = (args) => (
	<ColorPickerProvider>
		<HueSlider {...args} />
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = {}
