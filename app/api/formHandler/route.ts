"use server";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";

interface Context {
    params: undefined;
}

export async function POST(request: NextRequest, context: Context) {
    const body = await request.formData();
    var object: any = {};
    body.forEach(function (value, key) {
        object[key] = value;
    });
    try {
        const file = body.get("file") as File;
        let filePath = '';
        if (file) {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            await fs.writeFile(`./public/uploads/${file.name}`, buffer);
            filePath = `./public/uploads/${file.name}`;
        }
    } catch (e) {
        console.log("no cv")
    }
    return NextResponse.json({ data: object });
}
