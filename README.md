# @chaos-synthesis/react-color-picker

[![Npm Version](https://img.shields.io/npm/v/@chaos-synthesis/react-color-picker.svg?style=flat-square)](https://www.npmjs.com/package/@chaos-synthesis/react-color-picker)
[![Downloads](https://img.shields.io/npm/dm/@chaos-synthesis/react-color-picker.svg?style=flat-square)](https://www.npmjs.com/package/@chaos-synthesis/react-color-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)][license-url]

Customizable, easy to use color picker for React.js.

<br />

## Table of contents

- [Install](#install)
- [Basic usage](#basic-usage)
- [Customize layout](#customize-layout)
- [Customize components](#customize-components)
- [Misc](#misc)
- [License](#license)

## Install

```
npm install @chaos-synthesis/react-color-picker
```

```
yarn add @chaos-synthesis/react-color-picker
```

## Basic usage

```js
import { ColorPicker } from '@chaos-synthesis/react-color-picker'
import { useState } from 'react'

function MyApp() {
  // color value can be any valid Tinycolor2 constructor argument
  const [color, setColor] = useState('rgba(255,255,255,1)')

  // onChange callback will receive a Tinycolor2 instance
  return <ColorPicker value={color} onChange={(tc) => setColor(tc.toRgbString())} presets={['rgba(100,255,150,1)']} />
}
```

## Customize layout

Using `ColorPickerProvider` to wrap your custom layout and ready to use components:

```js
import {
  ChannelInputs,
  ColorBox,
  ColorPickerProvider,
  EyeDropper,
  HueSlider,
  OpacitySlider,
  Presets,
} from '@chaos-synthesis/react-color-picker'
import { useState } from 'react'

const presets = [
  'rgba(255,0,0,1)', // Red
  'rgba(0,255,0,1)', // Green
  'rgba(0,0,255,1)', // Blue
]
const WIDTH = 300

function CustomColorPicker() {
  const [color, setColor] = useState('#CC00CC9F')

  return (
    <ColorPickerProvider color={color} onChange={setColor}>
      <div style={{ width: WIDTH, margin: '0 auto' }}>
        <ColorBox width={WIDTH} height={WIDTH} />

        <div style={{ display: 'flex' }}>
          <EyeDropper size={24} />

          <div style={{ margin: '14px 0', flexGrow: 1 }}>
            <HueSlider style={{ marginBottom: 12 }} />
            <OpacitySlider />
          </div>
        </div>

        <ChannelInputs inputType="rgb" />

        <Presets items={presets} />
      </div>
    </ColorPickerProvider>
  )
}
```

Check storybook for more component examples.

## Customize components

Create your own components by using hooks:

```js
import { useAlphaChannel, useHexStringColor } from '@chaos-synthesis/react-color-picker'

function CustomOpacitySlider() {
  const [value, setValue] = useAlphaChannel()
  const [background] = useHexStringColor()

  return (
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      value={value}
      onChange={(e) => setValue(+e.target.value)}
      style={{ backgroundColor: background }}
    />
  )
}
```

**Note:** You should wrap your custom components with `ColorPickerProvider` to make them work. See [Customize layout](#customize-layout) for example.

## Misc

Started from [@boilertown/react-ui-boilerplate](https://github.com/boilertown/react-ui-boilerplate). Uses [tinycolor2](https://www.npmjs.com/package/tinycolor2) for color manipulation.

## License

Code released under the [MIT][license-url] license.

[license-url]: https://github.com/chaos-synthesis/react-color-picker/blob/main/LICENSE
