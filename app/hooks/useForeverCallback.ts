/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";


export default function useForeverCallback<T extends (...args: any[]) => any>(fn?: T): T {
    const fnRef = useRef<T | undefined>(fn)

    return useCallback<T>(((...args) => {
        return fnRef.current?.(...args)
    }) as T, [])
}