import { Router } from 'express';
import { parseISO } from 'date-fns';
/**
 * SoC: Separations of Concerns (Separação de preocupações)
 * DTO: Data Transfer Object
 */
/**
 * ROTA: Receber a requisição, chamar outro arquivo, devolver uma resposta
 */


//Importando arquivos Agendamento
import AppointmentsRepository from '../respositories/ApponitmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';


const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

//Listagem dos Agendamentos
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

//Criação de Agendamento
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider
    });

    return response.json(appointment);

  } catch (err) {

    return response
      .status(400)
      .json({ error: err.message });
  }
})

export default appointmentsRouter;
