import styled from '@emotion/styled'

export const Container = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 4px;
`

export const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2px;
	width: 17%;
`

export const ChannelInput = styled.input`
	/* Chrome, Safari, Edge, Opera */
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	/* Firefox */
	-moz-appearance: textfield;

	height: 28px;
	width: 100%;
	border-radius: 4px;
	border: 0.5px solid rgba(0, 0, 0, 0.2);
	padding: 6px 4px;
	outline: none;
	box-sizing: border-box;
	font-weight: 500;
	font-size: 14px;
	line-height: 1.14rem;
	letter-spacing: 0.02em;
	text-align: center;
`

export const ChannelInputLabel = styled.div`
	text-align: center;
	letter-spacing: 0.005em;
	font-weight: 400;
	font-size: 11px;
	line-height: 1.45;
	color: #828282;
`
