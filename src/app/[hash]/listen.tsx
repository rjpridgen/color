"use client"

import { useParams } from "next/navigation"
import { useLayoutEffect, useTransition } from "react"
import { useKeyboard } from "./useKeyboard"
import { negate } from "ramda"

export default function Listen({
    matrix,
    setMatrix
}: {
    matrix: {
        scale: number
        width: number
        height: number
        colors: string[]
    },
    setMatrix: (obj: any) => Promise<void>
}) {
    const { hash } = useParams<{hash: string}>()
    const [pending, transition] = useTransition()

    useLayoutEffect(() => {
        function onScreenUpdate() {
            const width = window.innerWidth
            const height = window.innerHeight

            if (!(width === matrix.width && height === matrix.height) && !pending) {
                transition(async () => {
                    await setMatrix({
                        width,
                        height
                    })
                })
            }
        }

        addEventListener("resize", onScreenUpdate)

        function update({ key }: KeyboardEvent) {
            if (!pending) {
                transition(async () => {
                    await setMatrix({
                        scale: key === "ArrowUp" ? Math.min(matrix.scale + 1, 16) : key === "ArrowDown" ? Math.max(1, matrix.scale - 1) : 0
                    })
                })
            }
        }

        addEventListener("keydown", update)
        return () => {
            removeEventListener("keydown", update)
            removeEventListener("resize", onScreenUpdate)
        }
    }, [pending, transition])

    return <div id={hash} />
}