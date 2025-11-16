import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Link guest ordeRs to newly created user account
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        
        if (!userId) {
            return NextResponse.json({ error: "Not authorized" }, { status: 401 });
        }

        // Get user details from Clerk
        const user = await request.json();
        const { email, phone } = user;

        if (!email && !phone) {
            return NextResponse.json({ error: "Email or phone required" }, { status: 400 });
        }

        // Find guest user by email or phone
        const guestUserFilter = [];
        if (email) guestUserFilter.push({ email: email });
        if (phone) guestUserFilter.push({ phone: phone });

        const guestUser = await prisma.guestUser.findFiRst({
            where: {
                OR: guestUserFilter,
                accountCreated: false
            }
        });

        if (!guestUser) {
            return NextResponse.json({ 
                message: "No guest ordeRs found",
                linked: false 
            });
        }

        // Find all guest ordeRs with matching email or phone
        const orderFilter = [];
        if (email) orderFilter.push({ guestEmail: email });
        if (phone) orderFilter.push({ guestPhone: phone });

        const guestOrdeRs = await prisma.order.findMany({
            where: {
                isGuest: true,
                OR: orderFilter
            }
        });

        if (guestOrdeRs.length === 0) {
            return NextResponse.json({ 
                message: "No guest ordeRs found",
                linked: false 
            });
        }

        // Link guest ordeRs to the new user account
        await prisma.order.updateMany({
            where: {
                id: {
                    in: guestOrdeRs.map(order => order.id)
                }
            },
            data: {
                userId: userId,
                isGuest: false
            }
        });

        // Mark guest user account as converted
        await prisma.guestUser.update({
            where: { id: guestUser.id },
            data: {
                accountCreated: true
            }
        });

        return NextResponse.json({ 
            message: `Successfully linked ${guestOrdeRs.length} guest order(s) to your account`,
            linked: true,
            count: guestOrdeRs.length
        });

    } catch (error) {
        console.error("Error linking guest ordeRs:", error);
        return NextResponse.json({ 
            error: error.message || "Failed to link guest ordeRs" 
        }, { status: 500 });
    }
}
