import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { ChannelInputs } from '../index'

export default {
	title: 'Components/Inputs',
	component: ChannelInputs,
} as ComponentMeta<typeof ChannelInputs>

const Template: ComponentStory<typeof ChannelInputs> = (args) => (
	<ColorPickerProvider>
		<ChannelInputs {...args} />
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = { inputType: 'rgb' }
