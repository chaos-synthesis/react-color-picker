import { useCallback } from 'react'
import tinycolor from 'tinycolor2'
import { useTinycolor } from '@src/hooks/useColorPicker'
import { DropperIcon } from './DropperIcon'
import { IconButton } from './EyeDropper.styled'

export interface EyeDropperProps {
	size?: number
}

export const EyeDropper = ({ size = 16 }: EyeDropperProps) => {
	const [, setValue] = useTinycolor()
	const disabled = !('EyeDropper' in window)

	const handleClick = useCallback(() => {
		if (!('EyeDropper' in window)) return

		// @ts-ignore EyeDropper is experimental and not in the TS lib
		const eyeDropper = new window.EyeDropper()
		const abortController = new window.AbortController()

		eyeDropper
			.open({ signal: abortController.signal })
			.then((result: { sRGBHex: string }) => {
				const tinyHex = tinycolor(result.sRGBHex)
				if (tinyHex.isValid()) setValue(tinyHex)
			})
			.catch((e) => console.log('eyeDropper error: ', e))
	}, [])

	return disabled ? null : (
		<IconButton onClick={handleClick} disabled={disabled}>
			<DropperIcon width={size} height={size} />
		</IconButton>
	)
}
