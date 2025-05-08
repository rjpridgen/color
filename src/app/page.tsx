"use client"

import { useRouter } from 'next/navigation'
import { v4 as uuid } from 'uuid'

export default function Page() {
    const router = useRouter()

    router.replace(`/${global?.innerWidth ?? 1200},${global?.innerHeight ?? 800},${uuid()}`)

    return null
}