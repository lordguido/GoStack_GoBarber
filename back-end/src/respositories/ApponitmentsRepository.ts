/**
 * Persistencia <-> Repositorio <-> Rota
 *
 * Find
 * Create
 *
 * Um repositorio por Model
 *
 */
import { isEqual } from 'date-fns';
//importando a Model
import Appointment from '../models/Appointment'

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {

  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  //Metodo para pegar Agendamento na mesma data
  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(date, appointment.date)
    );

    return findAppointment || null;
  }

  //Metodo para Listagem de Todos Agendamentos
  public all(): Appointment[] {
    return this.appointments;
  }

  //Metodo para Criar Agendamento
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;

