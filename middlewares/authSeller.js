import prisma from '@/lib/prisma';



const authSeller = async (userId) => {
    try {
        console.log('[ORDER API DEBUG] authSeller userId:', userId);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { store: true },
        })
        console.log('[ORDER API DEBUG] user from DB:', user);
        if(user && user.store){
            console.log('[ORDER API DEBUG] store status:', user.store.status);
            if(user.store.status === 'approved'){
                return user.store.id
            }
        }
        return false
    } catch (error) {
        console.log('[ORDER API DEBUG] authSeller error:', error);
        return false
    }
}

export default authSeller