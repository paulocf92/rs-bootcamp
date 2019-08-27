import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    // this job handles mail cancellation with the expected appointment data
    const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      // context holds expected info to be delivered to the template
      // i.e., appointment data
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às ' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancellationMail();
