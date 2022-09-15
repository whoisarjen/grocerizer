import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { pick } from 'lodash'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export function withCors(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    await runMiddleware(req, res, cors);

    return await handler(req, res);
  };
}

const prisma = new PrismaClient();

export const appRouter = trpc
  .router()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('user', {
    input: z
      .object({
        id: z.string()
      }),
    async resolve({ input }){
      try{
        return await prisma.user.findFirst({
            where: {
              id: input.id,
            }
        })
      }catch(err){
        throw err;
      }
    },
  });
// export type definition of API
export type AppRouter = typeof appRouter;
// export API handler
export default withCors(
  trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
  }))