export async function Box({
    color,
    col,
    row
}: {
    color: string;
    col: number;
    row: number;
}) {
    async function clickSquare() {
        "use server"

        console.log(color, col, row)
    }

    return (
        <form className="col" action={clickSquare}>
            <button className="block" style={{
                    backgroundColor: color
                }}  />
        </form>
    )
}