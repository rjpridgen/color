import { useEffect } from "react"

export function useKeyboard(onKeyPress: (event: KeyboardEvent) => void) {
    useEffect(() => {
        addEventListener("keydown", onKeyPress)
        return () => {
            removeEventListener("keydown", onKeyPress)
        }
    }, [])
}