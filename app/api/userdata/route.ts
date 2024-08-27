import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";

interface Context {
    params: undefined;
}

export async function GET(request: NextRequest, context: Context) {
    const userData = await fs.readFile(`./private/userData/userData.json`);
    return NextResponse.json(userData);
}
