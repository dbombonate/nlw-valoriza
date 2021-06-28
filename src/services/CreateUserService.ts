import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UserRepositories";
import { hash } from 'bcryptjs';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  
  async execute({ name, email, admin = false, password } : IUserRequest) {
    const userRepository = getCustomRepository(UsersRepositories);
    
    if (!email) {
      throw new Error('Email Incorrect');
    }

    const userAlreadyExists = await userRepository.findOne({ email });

    if (userAlreadyExists){ 
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8)

    const user = userRepository.create({
      name,
      email,
      admin,
      password: passwordHash, // Valor do atributo é diferente do nome do mesmo
    });

    await userRepository.save(user);

    return user;
  }

}

export { CreateUserService }