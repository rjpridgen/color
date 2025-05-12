"use server"

import { ISession, session, sessionSchema } from "@/io/session";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function enter({
    zoom,
    outerWidth,
    outerHeight
}: Partial<ISession>) {
    const user = await session()
    const userCookies = await cookies()

    if (user.zoom !== zoom || user.outerHeight !== outerHeight || user.outerWidth !== outerWidth) {
        userCookies.set("session", JSON.stringify(sessionSchema.parse({
            ...user,
            zoom,
            outerHeight,
            outerWidth,
        })))
        revalidatePath("/", "page")
    }

    return user
}