"use client"

import { colors } from "@/actions/ai.actions"
import { clickCell } from "@/actions/grid.actions"

interface ICell {
    rgb: string
    x: number
    y: number
}

export function Box(props: ICell) {
    return (
        <form className="col" action={props.x === 0 && props.y === 0 ? colors : clickCell}>
            <button className="block" type="submit" style={{ background: props.rgb }} />
        </form>
    )
}