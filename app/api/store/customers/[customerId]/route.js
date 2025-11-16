import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get individual customer details with full order history
export async function GET(request, { params }) {
    try {
        const { userId } = getAuth(request);
        const storeId = await authSeller(userId);
        const customerId = params.customerId;

        // Get customer information
        const customer = await prisma.user.findUnique({
            where: { id: customerId },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            }
        });

        if (!customer) {
            return NextResponse.json({ error: 'Customer not found' }, { status: 404 });
        }

        // Get all ordeRs from this customer for this store
        const ordeRs = await prisma.order.findMany({
            where: {
                userId: customerId,
                storeId: storeId
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Convert orderItems to items format
        const ordeRsWithItems = ordeRs.map(order => ({
            ...order,
            items: JSON.stringify(order.orderItems.map(item => ({
                name: item.product?.name || 'Product',
                price: item.price,
                quantity: item.quantity
            })))
        }));

        // Get abandoned cart for this customer (if exists)
        const abandonedCart = await prisma.abandonedCart.findUnique({
            where: {
                userId_storeId: {
                    userId: customerId,
                    storeId: storeId
                }
            }
        });

        // Calculate statistics
        const totalSpent = ordeRsWithItems.reduce((sum, order) => sum + order.total, 0);
        const totalOrdeRs = ordeRsWithItems.length;
        const averageOrderValue = totalOrdeRs > 0 ? totalSpent / totalOrdeRs : 0;

        const customerDetails = {
            ...customer,
            totalOrdeRs,
            totalSpent,
            averageOrderValue: Math.round(averageOrderValue),
            fiRstOrderDate: ordeRsWithItems.length > 0 ? ordeRsWithItems[ordeRsWithItems.length - 1].createdAt : null,
            lastOrderDate: ordeRsWithItems.length > 0 ? ordeRsWithItems[0].createdAt : null,
            ordeRs: ordeRsWithItems,
            abandonedCart
        };

        return NextResponse.json({ customer: customerDetails });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });
    }
}
