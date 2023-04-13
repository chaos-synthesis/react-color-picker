import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ColorPickerProvider } from '@src/hooks/useColorPicker'
import { EyeDropper } from '../index'

export default {
	title: 'Components/EyeDropper',
	component: EyeDropper,
} as ComponentMeta<typeof EyeDropper>

const Template: ComponentStory<typeof EyeDropper> = (args) => (
	<ColorPickerProvider>
		<div style={{ width: 300 }}>
			<EyeDropper {...args} />
		</div>
	</ColorPickerProvider>
)

export const Default = Template.bind({})
Default.args = {}
