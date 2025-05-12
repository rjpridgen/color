import { cookies } from "next/headers"
import { array, number, object, z } from 'zod'
import { cache } from "react"

export type ISession = z.infer<typeof sessionSchema>

export const sessionSchema = object({
    outerWidth: number().optional().default(-1),
    outerHeight: number().optional().default(-1),
    zoom: number().min(1).max(10).catch((e) => e.input).default(5),
    colorSelection: array(object({
        r: number().min(0).max(255),
        g: number().min(0).max(255),
        b: number().min(0).max(255)
    })).default([
        { r: 255, g: 97, b: 110 },
        { r: 243, g: 114, b: 44 },
        { r: 248, g: 150, b: 30 },
        { r: 249, g: 132, b: 74 },
        { r: 249, g: 199, b: 79 },
        { r: 144, g: 190, b: 109 },
        { r: 67, g: 170, b: 139 },
        { r: 77, g: 144, b: 142 },
        { r: 87, g: 117, b: 144 },
        { r: 39, g: 125, b: 161 }
    ])
})

export const getSessionFromCookies = async () => JSON.parse((await cookies()).get("session")?.value ?? "{}")

export const session = cache(async () => sessionSchema.parse(await getSessionFromCookies()))