# @chaos-synthesis/react-color-picker

Customizable, easy to use color picker for React.js

<br />

## Install

```
npm install @chaos-synthesis/react-color-picker
```

```
yarn add @chaos-synthesis/react-color-picker
```

## Basic Example

```js
import ColorPicker from '@chaos-synthesis/react-color-picker'
import React from 'react'

function MyApp() {
	const [color, setColor] = useState('rgba(255,255,255,1)')

	return <ColorPicker value={color} onChange={setColor} />
}
```

## Customization

Check storybook for more examples.

## License

Code released under the [MIT](https://github.com/hxf31891/react-gradient-color-picker/blob/main/LICENSE) license.

[license-url]: LICENSE
