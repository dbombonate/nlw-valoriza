import { json, Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, email, admin, password } = request.body;

    const createUserService = new CreateUserService();
      const user = await createUserService.execute({ name, email, admin, password });
      console.log(user);
      return response.json(user);      
  }
}

export { CreateUserController }