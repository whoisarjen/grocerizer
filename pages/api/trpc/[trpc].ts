import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import { pick } from 'lodash'

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
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});