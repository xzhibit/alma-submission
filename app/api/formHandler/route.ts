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
    const file = body.get("file") as File;
    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        await fs.writeFile(`./public/uploads/${file.name}`, buffer);
    }

    return NextResponse.json({ data: object });
}
