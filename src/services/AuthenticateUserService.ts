import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UserRepositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService{

  async execute({email, password}: IAuthenticateRequest){
    const userRepositories = getCustomRepository(UsersRepositories);

    // Verificar se email existe
    const user = await userRepositories.findOne({
      email
    });

    if(!user){
      throw new Error('Email/Password Incorrect');
    }

    // Verificar se a senha corresponde
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch){
      throw new Error('Email/Password Incorrect');
    }

    // Criar token
    const token = sign({
      email: user.email
    }, "7cacbeb6645619dd37e37e24e3e2c2f4",{
      subject: user.id,
      expiresIn: "7d",
    })

    return token;

  }

};

export { AuthenticateUserService };