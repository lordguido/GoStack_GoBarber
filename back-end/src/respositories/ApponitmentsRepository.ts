import { EntityRepository, Repository } from 'typeorm'

//importando a Model
import Appointment from '../models/Appointment'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {

  //Metodo para pegar Agendamento na mesma data
  public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where: { date }
    })

    return findAppointment || null;
  }

}

export default AppointmentsRepository;

