import { Dispatch, useSyncExternalStore } from 'react'

type StoreListener<T> = (newValue: T) => void
export type StoreType<T> = { get(): T; set(newValue: T): void; subscribe(listener: StoreListener<T>): () => void }

type ComplexValue<T> = (get: <S>(store: StoreType<S>) => S) => T
export function $<T>(atom: T | ComplexValue<T>, onChange?: StoreListener<T>): StoreType<T> {
	const listeners = new Set<StoreListener<T>>()
	let value: T = atom as T

	if (typeof atom === 'function') {
		const expression = atom as ComplexValue<T>
		// evaluate and subscribe to changes
		const getAndSubscribeOnce = (store) => {
			store.subscribe(() => {
				// evaluate new value on update
				const newValue = expression(<S>(s: StoreType<S>) => s.get())
				if (newValue === value) return
				value = newValue
				listeners.forEach((listener) => listener(newValue))
			})

			return store.get()
		}

		value = expression(getAndSubscribeOnce)
	}

	return {
		get() {
			return value
		},
		set(newValue: T) {
			// TODO: compare old and new value
			if (newValue === value) return
			value = newValue
			onChange?.(newValue)
			listeners.forEach((listener) => listener(newValue))
		},
		subscribe(listener: StoreListener<T>): () => void {
			listeners.add(listener)
			return () => listeners.delete(listener)
		},
	}
}

export function useStore$<T>(store: ReturnType<typeof $<T>>): [T, Dispatch<T>] {
	const state = useSyncExternalStore(store.subscribe, store.get)
	return [state, store.set]
}
