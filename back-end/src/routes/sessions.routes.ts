import { Router } from 'express';

const sessionsRouter = Router();

//Importando o Service
import AuthenticateUserService from '../services/AuthenticateUserService';

//Criação de Agendamento
sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password
  })

  delete user.password;

  return response.json({ user, token })

})

export default sessionsRouter;
