import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload'

const usersRouter = Router();
const upload = multer(uploadConfig);

//Importação de Usuario
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

//Importando Middlewares
import ensureAuthenticated from '../middlewares/ensureAuthenticated'


//Criação de Agendamento
usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password
  })

  delete user.password;

  return response.json(user);

})

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {

    const updateUserAvatar = new UpdateUserAvatarService();

    const { id } = request.user;
    const { filename } = request.file;

    const user = await updateUserAvatar.execute({
      user_id: id,
      avatarFilename: filename
    })

    delete user.password;

    return response.json(user)

  },
);

export default usersRouter;
