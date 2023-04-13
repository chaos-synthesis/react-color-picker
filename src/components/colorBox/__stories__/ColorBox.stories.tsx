import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { ColorBox } from '../index'

export default {
	title: 'Components/ColorBox',
	component: ColorBox,
} as ComponentMeta<typeof ColorBox>

const Template: ComponentStory<typeof ColorBox> = (args) => (
	<ColorPickerProvider>
		<ColorBox {...args} />
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = { width: 600, height: 400 }
