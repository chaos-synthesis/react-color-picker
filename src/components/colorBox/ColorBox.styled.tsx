import styled from '@emotion/styled'
import type { ColorBoxProps, ThumbProps } from './types'

export const Container = styled.div`
	position: relative;
	width: ${({ width }: ColorBoxProps) => width}px;
	height: ${({ height }: ColorBoxProps) => height}px;
`

export const ColorBoxCanvas = styled.canvas`
	width: ${({ width }: ColorBoxProps) => width}px;
	height: ${({ height }: ColorBoxProps) => height}px;
	border: 1px solid #f6f6f6;
`

export const Thumb = styled.div`
	--size: ${({ size }: ThumbProps) => size - 4}px;

	position: absolute;
	top: ${({ top }: ThumbProps) => top}px;
	left: ${({ left }: ThumbProps) => left}px;

	height: var(--size);
	width: var(--size);
	border-radius: 50%;
	border: 2px solid white;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
	cursor: pointer;
	pointer-events: none;
`
