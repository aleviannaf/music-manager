import { Request, Response } from "express";
import { User, UserRead } from "../interfaces";
import { userServices } from "../services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: User = await userServices.create(res.locals.validated);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const user: User = res.locals.foundUser;
  return res.status(200).json(user);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const { validated } = res.locals;
  const user: User = await userServices.partialUpdate(userId, validated);
  return res.status(200).json(user);
};

const destroy = async (req: Request, res: Response): Promise<Response> => {
  await userServices.destroy(req.params.userId);
  return res.status(204).json();
};

export default { create, read, retrieve, partialUpdate, destroy };