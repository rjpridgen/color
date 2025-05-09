"use server"

import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function colors(data: FormData) {
    const { env } = getCloudflareContext();
    
    const response = await env.AI.run("@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", {
        prompt: "Generate a list of 5 colors in hexadecimal format.",
        stream: false,
        response_format: {
            "type": "json_schema",
            "json_schema": {
            "type": "object",
            "properties": {
                "colors": {
                "type": "array",
                "items": {
                    "type": "string"
                }
                }
            },
            "required": [
                "colors"
            ]
            }
        }
    })

    console.log(response)
}
