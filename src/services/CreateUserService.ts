import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UserRepositories"

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  
  async execute({ name, email, admin, password } : IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);
    
    if (!email) {
      throw new Error('Email Incorrect');
    }

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists){ 
      throw new Error('User already exists');
    }

    const user = userRepository.create({
      name,
      email,
      admin,
      password,
    });

    await userRepository.save(user);

    return user;
  }

}

export { CreateUserService }