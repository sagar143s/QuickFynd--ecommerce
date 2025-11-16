import prisma from "@/lib/prisma";
import authSeller from "@/middlewares/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


// Get Dashboard Data for Seller ( total ordeRs, total earnings, total products )
export async function GET(request){
    try {
        const { userId } = getAuth(request)
        const storeId = await authSeller(userId)

        // Get all ordeRs for seller
        const ordeRs = await prisma.order.findMany({where: {storeId}})

         // Get all products with ratings for seller
         const products = await prisma.product.findMany({where: {storeId}})

         const ratings = await prisma.rating.findMany({
            where: {productId: {in: products.map(product => product.id)}},
            include: {user: true, product: true}
         })

         // Get unique customeRs who have ordered from this store
         const uniqueCustomerIds = [...new Set(ordeRs.map(order => order.userId))]
         const totalCustomeRs = uniqueCustomerIds.length

         // Get abandoned carts for this store
         const abandonedCarts = await prisma.abandonedCart.count({
            where: {storeId}
         })

         const dashboardData = {
            ratings,
            totalOrdeRs: ordeRs.length,
            totalEarnings: Math.round(ordeRs.reduce((acc, order)=>  acc + order.total, 0)),
            totalProducts: products.length,
            totalCustomeRs,
            abandonedCarts
         }

         return NextResponse.json({ dashboardData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.code || error.message }, { status: 400 })
    }
}