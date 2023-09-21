import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";
import format from "pg-format";

type BodyOrParams = "params" | "body"

const validateIdExists =
  (
    bodyOrParams: BodyOrParams,
    idKeyName: string,
    tbName: string,
    errorMsg: string
  ) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      /**De onde vem o id?
      *  1. Corpo da requisição.
      *  2. Parâmetros de rota.
      * Quais são os pontos dinâmicos desse middleware?
      *  1. Mensagem de erro.
      *  2. Qual a tabela que vai ser feita a query.
      *  3. Qual o nome do id.
      */
      const id = req[bodyOrParams][idKeyName]

      const queryFormat: string = format(
        `SELECT * FROM %I WHERE "id" = $1`,
        tbName
      )

      const queryResult: UserResult = await client.query(
        '',
        [id]
      );

      if (queryResult.rowCount === 0) {
        throw new AppError(errorMsg, 404);
      }

      res.locals = { ...res.locals, foundUser: queryResult.rows[0] };

      return next();
    };

export default validateIdExists;