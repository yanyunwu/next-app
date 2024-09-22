import { useCallback, useRef } from "react";


export default function useForeverCallback<T extends (...args: any[]) => any>(fn: T): T
export default function useForeverCallback<T extends (...args: any[]) => any>(fn?: T): T | undefined

export default function useForeverCallback<T extends (...args: any[]) => any>(fn?: T): T | undefined {
    const fnRef = useRef<T | undefined>(fn)

    const callback = useCallback<T>(((...args) => {
        return fnRef.current?.(...args)
    }) as T, [])

    return fn ? callback : undefined
}