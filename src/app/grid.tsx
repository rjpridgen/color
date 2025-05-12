import { createColorStreamIO } from "@/io/color"
import { createUniformGrid } from "@/io/grid"
import { session } from "@/io/session"
import { range, rgb } from "d3"

export async function Grid() {
    const user = await session()
    const gridArr = createUniformGrid(user.outerWidth, user.outerHeight, user.zoom)
    const rows = gridArr.length
    const columns = gridArr[0].length
    const xAxis = range(0, rows)
    const yAxis = range(0, columns)
    const colorMatrix = createColorStreamIO(user.colorSelection.map((c) => rgb(c.r, c.g, c.b).formatHex()), rows, columns)

    return xAxis.map((row) => (
        <div className="row" key={row}>
            {yAxis.map((col) => (
                <div className="col" key={(row + (row * xAxis.length)) + col}>
                    <button type="submit" className="block" style={{
                        backgroundColor: rgb(colorMatrix[row][col]).formatHsl()
                    }} />
                </div>
            ))}
        </div>
    ))
}