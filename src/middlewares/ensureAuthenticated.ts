import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
  // Recebendo token
  const authToken = req.headers.authorization;

  // Validar se token foi preenchido
  if (!authToken){
    return res.status(401).send({error: "Invalid Token"})
  };

  // Verificar estrutura do token
  const [,token] = authToken.split(' ');

  // Validar se token é válido
  try {
    const { sub } = verify(token, "7cacbeb6645619dd37e37e24e3e2c2f4") as IPayload;
    // Recuperar informação do usuário
    req.user_id = sub; 
    return next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid Token"})
  }
}