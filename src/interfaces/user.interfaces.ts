import { QueryResult } from "pg";
import { z } from "zod";
import { user, userCreate, userRead, userReturn, userUpdate } from "../schemas";

type User = z.infer<typeof user>;
type UserReturn = z.infer<typeof userReturn>

type UserCreate = z.infer<typeof userCreate>
type UserRead = z.infer<typeof userRead>;
type UserUpdate = z.infer<typeof userUpdate>;

type UserResult = QueryResult<User>;

export { User, UserCreate, UserRead, UserUpdate, UserResult, UserReturn };