import { getCustomRepository } from 'typeorm';
import { ComplimentRepositories } from '../repositories/ComplimentRepositories';
import { UsersRepositories } from '../repositories/UserRepositories';

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({ tag_id, user_receiver, user_sender, message }: IComplimentRequest){
    
    const complimentRepositories = getCustomRepository(ComplimentRepositories);
    
    const userRepositories = getCustomRepository(UsersRepositories);

    if (user_receiver === user_sender) {
      throw new Error("User receiver incorrect")
    };
    
    const userReceiverExists = await userRepositories.findOne(user_receiver);

    if(!userReceiverExists){
      throw new Error("User receiver does not exists")
    };

    const compliment = complimentRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentRepositories.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };