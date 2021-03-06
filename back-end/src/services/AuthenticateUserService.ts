import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import User from './../models/User'
import authConfig from '../config/auth'



interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const usersRepository = getRepository(User);

    //Validando o Email
    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    //Validando Senha
    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    //Criando o Token
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })

    return { user, token }
  }
}

export default AuthenticateUserService;
