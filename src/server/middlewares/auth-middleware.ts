


import type { Context, Next } from 'hono'
import { auth } from '@/lib/auth'
import { log } from '@/lib/logger'

export const authMiddleware = async (c: Context, next: Next) => {
    try {
        const session = await auth();

        if (!session) {
            return c.json({ error: 'Unauthorized' }, 401)
        }

        c.set('user', session.user) // Attach user data to context
        await next()
    } catch (err) {
        console.error('Error in auth middleware:', err)
        log("error", "Error in auth middleware: " + err)
        return c.json({ error: 'Internal server error' }, 500)
    }
}
