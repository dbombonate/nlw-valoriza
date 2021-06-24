import { json, Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, email, admin } = request.body;

    const createUserService = new CreateUserService();
    try {
      const user = await createUserService.execute({ name, email, admin });
      console.log(user);
      return response.json(user);      
    } catch (err) {
        return response.json({"error": "User already exists"});
    }
  }
}

export { CreateUserController }