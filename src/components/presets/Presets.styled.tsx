import styled from '@emotion/styled'

export const Container = styled.div`
	display: flex;
	margin-top: 14px;
	justify-content: space-between;
`

export const PreviewBox = styled.div`
	width: 80px;
	height: 80px;
	background: ${({ background }: { background: string }) => background};
	border-radius: 2px;
	flex-shrink: 0;
	margin: 0 10px 0 0;
`

export const PresetsBox = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-grow: 1;
	//justify-content: space-between;
	gap: 4px;
`

interface IPresetItem {
	width: string
	background: string
	border: string
}
export const PresetItem = styled.div`
	height: 36px;
	width: ${({ width }: IPresetItem) => width};
	background: ${({ background }: IPresetItem) => background};
	border-radius: 2px;
	border: ${({ border }: IPresetItem) => border};
`
