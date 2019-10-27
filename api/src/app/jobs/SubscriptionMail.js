import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup, user } = data;

    Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: 'Inscrição realizada',
      template: 'subscription',
      context: {
        organizer: meetup.organizer.name,
        user: user.name,
        meetup: meetup.title,
        email: user.email,
      },
    });
  }
}

export default new SubscriptionMail();
