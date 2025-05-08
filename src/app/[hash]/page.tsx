import { createColorStreamIO } from "@/io/color"
import { fromDimensions } from "@/io/declarations"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { range } from "ramda"
import { v4 as uuid } from 'uuid'
import Listen from "./listen"
import { paletteFrom } from "@/styles/palettes"
import { Box } from "./box"

export default async function Page(params: {
    params: Promise<{
        hash: string
    }>
}) {
    const { hash } = (await params.params)
    const [width, height] = decodeURIComponent(hash).split(",")
    const cookieVal = (await cookies()).get("grid")?.value
    const matrix = !cookieVal ? { scale: 1, width: parseInt(width), height: parseInt(height), colors: paletteFrom(4) } : JSON.parse(cookieVal)

    async function clickSquare() {
        "use server"
    }

    async function updateMatrix(data: Partial<{
        scale: number
        width: number
        height: number
        colors: string[]
    }>) {
        "use server"

        const updateData = {...matrix, ...data}

        ; (await cookies()).set("grid", JSON.stringify(updateData), {
            secure: true,
            httpOnly: true,
            sameSite: "strict"
        })

        redirect(`/${updateData.width.toString()},${updateData.height.toString()},${uuid()}`)
    }

    const [rows, columns] = fromDimensions([1.2 * (matrix.scale + 1), Math.PI])([
        matrix.width,
        matrix.height
    ])
    const xAxis = range(0, rows)
    const yAxis = range(0, columns)
    const colorMatrix = createColorStreamIO(matrix.colors, rows, columns)

    const grid = xAxis.map((_, rIndx) => ({
        id: rIndx,
        columns: yAxis.map((_, cIndx) => ({
            id: cIndx,
            rgbStr: colorMatrix[rIndx][cIndx]
        }))
    }))

    return (
        <div className="wrapper">
            <Listen matrix={matrix} setMatrix={updateMatrix} />

            {grid.map(({ id, columns }, i1) => (
                <div className="row" key={id}>
                    {columns.map((col, i2) => (
                        <Box key={(i1 + (i1 * grid.length)) + i2} color={col.rgbStr} col={i1} row={i2} />
                    ))}
                </div>
            ))}
        </div>
    )
}