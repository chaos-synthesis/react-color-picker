import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPicker } from '../ColorPicker'

export default {
	title: 'All In/Color Picker',
	component: ColorPicker,
} as ComponentMeta<typeof ColorPicker>

const Template: ComponentStory<typeof ColorPicker> = (args) => <ColorPicker {...args} />

export const Default = Template.bind({})
Default.args = {}
