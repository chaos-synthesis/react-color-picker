import { createContext, Dispatch, PropsWithChildren, useContext, useEffect, useMemo, useSyncExternalStore } from 'react'
import tc, { ColorFormats, ColorInput, Instance } from 'tinycolor2'
import { $, StoreType, useStore$ } from '@src/hooks/useStore'

// @ts-ignore
export const ColorPickerContext = createContext<{ $tinycolor: StoreType<Instance> }>(null)

export const ColorPickerProvider = ({
	color,
	onChange,
	children,
}: PropsWithChildren<{ color?: ColorInput; onChange?: (color: Instance) => void }>) => {
	const $tinycolor = useMemo(() => $(tc(color ?? { r: 254, g: 254, b: 254, a: 1 })), [])
	useEffect(() => {
		$tinycolor.set(tc(color ?? { r: 175, g: 51, b: 252, a: 1 }))
		return $tinycolor.subscribe(() => onChange?.($tinycolor.get()))
	}, [color])

	return <ColorPickerContext.Provider value={{ $tinycolor }}>{children}</ColorPickerContext.Provider>
}

export function useCreateColorStore<T>(
	createStoreFn: ($tinycolor: StoreType<Instance>) => StoreType<T>
): [T, Dispatch<T>] {
	const { $tinycolor } = useContext(ColorPickerContext)
	const store = useMemo(() => createStoreFn($tinycolor), [$tinycolor])

	const state = useSyncExternalStore(store.subscribe, store.get)
	return [state, store.set]
}

export const useTinycolor = () => useStore$(useContext(ColorPickerContext).$tinycolor)

export const useAlphaChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toRgb().a * 100),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toRgb() }).setAlpha(+value / 100))
		)
	)

export const useRedChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => get($tinycolor).toRgb().r,
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toRgb(), r: value }))
		)
	)
export const useGreenChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => get($tinycolor).toRgb().g,
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toRgb(), g: value }))
		)
	)
export const useBlueChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => get($tinycolor).toRgb().b,
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toRgb(), b: value }))
		)
	)

// HEX format
export const useHexStringColor = () => useCreateColorStore(($tinycolor) => $((get) => get($tinycolor).toHexString()))

// HSV(HSB) format
export const useHsvaColor = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => get($tinycolor).toHsv(),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsv(), ...value }))
		)
	) as [ColorFormats.HSVA, (newValue: Partial<ColorFormats.HSVA>) => void]

export const useHueChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toHsv().h),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsv(), h: value | 0 }))
		)
	)
export const useHsvSaturationChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toHsv().s * 100),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsv(), s: value / 100 }))
		)
	)
export const useBrightnessChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toHsv().v * 100),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsv(), v: value / 100 }))
		)
	)

// HSL format
export const useHslSaturationChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toHsl().s * 100),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsl(), s: value / 100 }))
		)
	)
export const useLightnessChannel = () =>
	useCreateColorStore(($tinycolor) =>
		$(
			(get) => Math.round(get($tinycolor).toHsl().l * 100),
			(value) => $tinycolor.set(tc({ ...$tinycolor.get().toHsl(), l: value / 100 }))
		)
	)
