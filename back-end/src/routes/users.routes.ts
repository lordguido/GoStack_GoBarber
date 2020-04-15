import { Router } from 'express';

const usersRouter = Router();

//Importação de Usuario
import CreateUserService from '../services/CreateUserService';


//Criação de Agendamento
usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    })

    return response.json(user);
  } catch (err) {

    return response
      .status(400)
      .json({ error: err.message });
  }
})

export default usersRouter;
