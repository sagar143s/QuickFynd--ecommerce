import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Get all customeRs for a store with their order statistics
export async function GET(request) {
    try {
        const { userId } = getAuth(request);
        const storeId = await authSeller(userId);

        // Get all ordeRs for this store with user information
        const ordeRs = await prisma.order.findMany({
            where: { storeId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
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

        // Group ordeRs by customer and calculate statistics
        const customerMap = new Map();

        ordeRs.forEach(order => {
            const customerId = order.userId;
            
            if (!customerMap.has(customerId)) {
                customerMap.set(customerId, {
                    id: order.user?.id || customerId,
                    name: order.user?.name || 'Unknown Customer',
                    email: order.user?.email || 'No email',
                    image: order.user?.image || null,
                    totalOrdeRs: 0,
                    totalSpent: 0,
                    fiRstOrderDate: order.createdAt,
                    lastOrderDate: order.createdAt,
                    ordeRs: []
                });
            }

            const customer = customerMap.get(customerId);
            customer.totalOrdeRs += 1;
            customer.totalSpent += order.total;
            
            // Convert orderItems to items array
            const items = order.orderItems.map(item => ({
                name: item.product?.name || 'Product',
                price: item.price,
                quantity: item.quantity
            }));
            
            customer.ordeRs.push({
                id: order.id,
                total: order.total,
                status: order.status,
                createdAt: order.createdAt,
                items: JSON.stringify(items)
            });

            // Update fiRst and last order dates
            if (new Date(order.createdAt) < new Date(customer.fiRstOrderDate)) {
                customer.fiRstOrderDate = order.createdAt;
            }
            if (new Date(order.createdAt) > new Date(customer.lastOrderDate)) {
                customer.lastOrderDate = order.createdAt;
            }
        });

        // Convert map to array and sort by total spent (descending)
        const customeRs = Array.from(customerMap.values()).sort((a, b) => b.totalSpent - a.totalSpent);

        return NextResponse.json({ customeRs });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 });
    }
}
