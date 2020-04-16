import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import AppError from '../errors/AppError'

import User from './../models/User'

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}



class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    //Não Criar usuário com email duplicado
    const checkUserExists = await usersRepository.findOne({
      where: { email }
    })

    if (checkUserExists) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    //Criando a Instancia do Usuário
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    })

    //Salvando o usuário no Banco
    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
