import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'
import uploadConfig from '../config/upload'

import AppError from '../errors/AppError'

import User from '../models/User';

interface RequestDTO {
  user_id: string;
  avatarFilename: string;
}

class UpadateUserAvatarService {
  public async execute({ user_id, avatarFilename }: RequestDTO): Promise<User> {
    const userRepository = getRepository(User);

    //Validando ID do usuário
    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    //Deletar Avatar Anterior
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;

  }
}

export default UpadateUserAvatarService;
