import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { OpacitySlider } from '../index'

export default {
	title: 'Components/OpacitySlider',
	component: OpacitySlider,
} as ComponentMeta<typeof OpacitySlider>

const Template: ComponentStory<typeof OpacitySlider> = (args) => (
	<ColorPickerProvider>
		<OpacitySlider {...args} />
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = {}
