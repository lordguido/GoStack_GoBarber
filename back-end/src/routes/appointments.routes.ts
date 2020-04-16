import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'

//Importando arquivos Agendamento
import AppointmentsRepository from '../respositories/ApponitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

//Importando Middlewares
import ensureAuthenticaded from '../middlewares/ensureAuthenticated'

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticaded);

//Listagem dos Agendamentos
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

//Criação de Agendamento
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id
    });

    return response.json(appointment);

  } catch (err) {

    return response
      .status(400)
      .json({ error: err.message });
  }
})

export default appointmentsRouter;
