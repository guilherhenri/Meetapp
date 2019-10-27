import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class DetailsController {
  async index(req, res) {
    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
          required: true,
        },
        {
          model: File,
          as: 'file',
          attributes: ['id', 'name', 'path', 'url'],
          required: true,
        },
      ],
    });

    return res.json(meetup);
  }
}

export default new DetailsController();
