import styled from '@emotion/styled'
import type { OpacitySliderProps } from './types'

export const Container = styled.div`
	position: relative;
	display: flex;
`

export const BaseRangeSlider = styled.input`
	-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
	background: transparent; /* Otherwise white in Chrome */
	width: ${(props: OpacitySliderProps) => props.width || '100%'}; /* Specific width is required for Firefox. */
	margin: 0;

	&::-webkit-slider-thumb {
		-webkit-appearance: none;
	}

	&:focus {
		outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
	}

	&::-ms-track {
		width: ${(props: OpacitySliderProps) => props.width || '100%'};
		cursor: pointer;
		/* Hides the slider so custom styles can be added */
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
`

export const RangeSliderThumb = styled(BaseRangeSlider)`
	--size: ${(props: OpacitySliderProps) => props.thumbSize || '12px'};
	--height: ${(props: OpacitySliderProps) => props.height || '12px'};
	/* Special styling for WebKit/Blink */
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		border: 2px solid white;
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		//background: #ffffff;
		cursor: pointer;
		margin-top: calc(
			(var(--size) - var(--height)) * -0.5 - 0.5px /* 0.5px - border width */
		); /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5); /* Add cool effects to your sliders! */
	}

	/* All the same stuff for Firefox */
	&::-moz-range-thumb {
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		border: 2px solid white;
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		//background: #ffffff;
		cursor: pointer;
	}

	/* All the same stuff for IE */
	&::-ms-thumb {
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
		border: 2px solid white;
		height: var(--size);
		width: var(--size);
		border-radius: 50%;
		//background: #ffffff;
		cursor: pointer;
	}
`

export const RangeSlider = styled(RangeSliderThumb)`
	--width: ${(props: OpacitySliderProps) => props.width || '100%'};
	--height: ${(props) => props.height || '12px'};
	--border-radius: ${(props) => props.borderRadius || 'calc(var(--height) / 2)'};
	--border: ${(props) => props.border || '0.5px solid rgba(0, 0, 0, 0.2)'};
	--background: ${({ backgroundColor = '#000000' }) =>
		`linear-gradient(to right, ${backgroundColor}00, ${backgroundColor}ff)`};

	&::-webkit-slider-runnable-track {
		width: var(--width);
		height: var(--height);
		cursor: pointer;
		//box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		background: var(--background);
		border-radius: var(--border-radius);
		border: var(--border);
	}

	&:focus::-webkit-slider-runnable-track {
		background: var(--background);
	}

	&::-moz-range-track {
		width: var(--width);
		height: var(--height);
		cursor: pointer;
		//box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		background: var(--background);
		border-radius: var(--border-radius);
		border: var(--border);
	}
	// IE
	&::-ms-track {
		width: var(--width);
		height: var(--height);
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		border-width: 16px 0;
		color: transparent;
	}
	&::-ms-fill-lower {
		background: #2a6495;
		border: var(--border);
		border-radius: 2.6px;
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	}
	&:focus::-ms-fill-lower {
		background: var(--background);
	}
	&::-ms-fill-upper {
		background: var(--background);
		border: var(--border);
		border-radius: 2.6px;
		box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
	}
	&:focus::-ms-fill-upper {
		background: #367ebd;
	}
`

export const Chessboard = styled.div`
	--height: ${(props: OpacitySliderProps) => props.height || '12px'};
	--pixel: calc(var(--height) / 4);
	--pixel2: calc(var(--height) / 2);
	--border-radius: ${(props) => props.borderRadius || 'calc(var(--height) / 2)'};

	background-image: linear-gradient(90deg, #333 var(--pixel), white var(--pixel)),
		linear-gradient(90deg, white var(--pixel), #333 var(--pixel)),
		linear-gradient(90deg, #333 var(--pixel), white var(--pixel)),
		linear-gradient(90deg, white var(--pixel), #333 var(--pixel));
	background-position: 0 0, 0 var(--pixel), 0 var(--pixel2), 0 calc(var(--pixel) * 3);
	background-size: var(--pixel2) var(--pixel), var(--pixel2) var(--pixel), var(--pixel2) var(--pixel),
		var(--pixel2) var(--pixel);
	background-repeat: repeat-x;

	border-radius: var(--border-radius);
	width: 100%;
	height: var(--height);
	position: absolute;
	z-index: -1;
`
