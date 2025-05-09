"use client"

import { clickCell } from "@/actions/grid.actions"
import { useFormState } from "react-dom"

interface ICell {
    rgb: string
    x: number
    y: number
}

export function Box(props: ICell) {
    return (
        <div className="col">
            
        </div>
    )
}