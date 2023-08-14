import { z } from "zod";

const user = z.object({
  id: z.number().positive(),
  username: z.string().max(60),
  // email: z.string().email().max(60),
  password: z.string().max(120),
  admin: z.boolean().default(() => false),
  createdAt: z.date(),
});

const userReturn = user.omit({ password: true });
const userCreate = user.omit({ id: true, createdAt: true });
const userUpdate = userCreate.partial();
const userRead = userReturn.array();

export { user, userCreate, userUpdate, userRead, userReturn };