import imagekit from "@/configs/imageKit";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const authenticationParameteRs = imagekit.getAuthenticationParameteRs();
        return NextResponse.json(authenticationParameteRs, { status: 200 });
    } catch (error) {
        console.error("Error generating ImageKit auth:", error);
        return NextResponse.json({ error: "Failed to generate authentication" }, { status: 500 });
    }
}
