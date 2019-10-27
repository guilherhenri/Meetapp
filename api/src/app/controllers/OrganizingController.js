import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class OrganizingController {
  async index(req, res) {
    const checkUserOrganizer = await User.findOne({
      where: {
        id: req.userId,
        organizer: true,
      },
    });

    if (!checkUserOrganizer) {
      return res.status(401).json({ error: 'User is not a organizer' });
    }
    const organizing = await Meetup.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'title', 'description', 'location', 'date', 'file_id'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['name', 'path', 'url'],
          required: true,
        },
      ],
    });

    return res.json(organizing);
  }
}

export default new OrganizingController();
