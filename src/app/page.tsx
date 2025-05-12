import { session } from "@/io/session"
import Dimensions from "./dimensions"
import { Grid } from "./grid"

export default async function Page() {
    const user = await session()

    return (
        <Dimensions {...user}>
            {user.outerHeight === -1 ? "" : <Grid />}
        </Dimensions>
    )
}