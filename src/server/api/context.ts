import { Session } from 'next-auth'
import { getUserSession } from '@/lib/auth'
import { NextApiRequest } from 'next'

export type CreateContextOptions = {
  session: Session | null;
  req: NextApiRequest;
}

export async function createTRPCContext({ req }: { req: NextApiRequest }): Promise<CreateContextOptions> {
  const session = await getUserSession();
  return {
    session,
    req,
  }
}
