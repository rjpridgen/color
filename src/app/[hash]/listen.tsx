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

        function update({ key }: KeyboardEvent) {
            if (!pending) {
                const update = key === "ArrowUp" ? 1 : key === "ArrowDown" ? -1 : 0

                if (update) {
                    transition(async () => {
                        await setMatrix({
                            scale: matrix.scale + update
                        })
                    })
                }
            }
        }
        addEventListener("keydown", update)
        return () => {
            removeEventListener("keydown", update)
        }
    }, [pending, transition])

    return <div id={hash} />
}