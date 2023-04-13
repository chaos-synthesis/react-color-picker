import { useCallback, useEffect, useRef, useState } from 'react'
import { useHsvaColor } from '@src/hooks/useColorPicker'
import { useEventListener } from '@src/hooks/useEventListener'
import { ColorBoxCanvas, Container, Thumb } from './ColorBox.styled'
import { ColorBoxProps } from './types'

function drawColorBox(ctx: CanvasRenderingContext2D, hue: number, width: number, height: number) {
	ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
	ctx.fillRect(0, 0, width, height)
	const gradientWhite = ctx.createLinearGradient(0, 0, width, 0)
	gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`)
	gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`)
	ctx.fillStyle = gradientWhite
	ctx.fillRect(0, 0, width, height)
	const gradientBlack = ctx.createLinearGradient(0, 0, 0, height)
	gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`)
	gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`)
	ctx.fillStyle = gradientBlack
	ctx.fillRect(0, 0, width, height)
}

function getPosition(e: MouseEvent, element: HTMLCanvasElement) {
	const { clientX, clientY } = e
	const { left, top } = element.getBoundingClientRect()
	return [(clientX - left) | 0, (clientY - top) | 0]
}

export const ColorBox = ({ width = 900, height = 900, thumbSize = 12 }: ColorBoxProps) => {
	const [color, setColor] = useHsvaColor()
	const [thumbPosition, setThumbPosition] = useState({ top: 0, left: 0 })
	const isDraggingRef = useRef<boolean>(false)
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const canvasContextRef = useRef<CanvasRenderingContext2D | null>(null)
	const imageDataRef = useRef<ImageData | null>(null)

	const handleChangeColor = useCallback(
		(e: MouseEvent) => {
			if (!canvasRef.current || !imageDataRef.current) return

			const [x, y] = getPosition(e, canvasRef.current)
			setThumbPosition({ top: y - thumbSize / 2, left: x - thumbSize / 2 })

			const alpha = imageDataRef.current.data.at(
				(x + y * width) * 4 + 3 /* where '4' is color data len (e.g. r,g,b,a) */
			)
			if (alpha !== 255) {
				// if alpha is not 100% opaque it means we are outside the color box
				isDraggingRef.current = false
				return
			}

			const saturation = x / width
			const brightness = 1 - y / height
			setColor({
				// h: Math.round(color.h),
				s: saturation,
				v: brightness,
			})
		},
		[height, width, thumbSize]
	)

	useEffect(() => {
		if (!canvasContextRef.current)
			canvasContextRef.current = canvasRef.current?.getContext('2d', { willReadFrequently: true }) ?? null
		if (isDraggingRef.current || !canvasContextRef.current) return

		// draw color box
		drawColorBox(canvasContextRef.current, color.h, width, height)
		imageDataRef.current = canvasContextRef.current.getImageData(0, 0, width, height)

		const x = Math.min(color.s * width, width) | 0
		const y = Math.min((1 - color.v) * height, height) | 0
		setThumbPosition({ top: y - thumbSize / 2, left: x - thumbSize / 2 })
	}, [height, width, thumbSize, color])

	useEventListener(
		'mousemove',
		(e: MouseEvent) => {
			if (!isDraggingRef.current) return
			handleChangeColor(e)
		},
		canvasRef,
		{ passive: false }
	)

	useEventListener(
		'mousedown',
		(e) => {
			isDraggingRef.current = true
			handleChangeColor(e)
		},
		canvasRef
	)
	useEventListener('mouseup', () => (isDraggingRef.current = false))

	return (
		<Container width={width} height={height}>
			<Thumb {...thumbPosition} size={thumbSize} />
			<ColorBoxCanvas width={width} height={height} ref={canvasRef} />
		</Container>
	)
}
