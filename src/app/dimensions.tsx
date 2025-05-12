"use client"

import { enter } from "@/actions/authorization"
import { ISession } from "@/io/session"
import { debounce } from "lodash/fp"
import { PropsWithChildren, useActionState, useLayoutEffect, useRef } from "react"

const resizeQueue = debounce(250)
const zoomQueue = debounce(100)

export default function Dimensions({children, ...user}: PropsWithChildren<ISession>) {
    const pendingZoomChange = useRef(user.zoom)

    const [session, dispatch, pending] = useActionState<Partial<ISession>>(() => enter({
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        zoom: pendingZoomChange.current,
    }), user)

    useLayoutEffect(() => {
        const onResize = resizeQueue(dispatch)

        if (user.outerHeight === -1 || user.outerWidth === -1) {
            onResize()
        } else {
            addEventListener("resize", onResize)

            return () => {
                removeEventListener("resize", onResize)
            }
        }
    }, [])

    useLayoutEffect(() => {
        const keydown = zoomQueue(({ key }: KeyboardEvent) => {
            pendingZoomChange.current = pendingZoomChange.current + (key === "ArrowUp" ? 1 : key === "ArrowDown" ? -1 : 0)
            dispatch()
        })

        addEventListener("keydown", keydown)

        return () => {
            removeEventListener("keydown", keydown)
        }
    }, [])

    return (
        <form className="wrapper" action={dispatch}>
            {children}
        </form>
    )
}