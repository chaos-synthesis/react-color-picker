import styled from '@emotion/styled'

export const IconButton = styled.button`
	outline: 0;
	border: none;
	box-shadow: 1px 1px 3px rgba(0, 0, 0, 0);
	background: transparent;
	cursor: pointer;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.2;
	}
`
