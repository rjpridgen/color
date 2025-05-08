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
        <form className="col" >
            <button className="block" formAction={clickSquare} style={{
                    backgroundColor: color
                }}  />
        </form>
    )
}