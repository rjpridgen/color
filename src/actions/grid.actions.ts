"use server"

import { rgb } from "d3"
import z from "zod"

interface IClaveForm {
    entries: IClave[]
}

export interface IClave {
    r: number
    b: number
    g: number
    x: number
    y: number
}

const input = z.tuple([z.string().max(14).min(8), z.string(), z.string()])

export async function clickCell(data: FormData) {
    console.log(data.entries())
}