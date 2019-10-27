import * as Yup from 'yup';
import { Op } from 'sequelize';
import { format, startOfHour, endOfDay, isBefore, parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { date, page } = req.query;

    if (!date || !page) {
      return res.status(400).json({ erro: 'Invalid date and/or page' });
    }

    const parseDate = format(parseISO(date), 'yyyy-MM-dd');

    const limit = 10;

    const data = await Meetup.findAndCountAll({
      where: {
        date: {
          [Op.between]: [
            startOfHour(parseISO(parseDate)),
            endOfDay(parseISO(parseDate)),
          ],
        },
      },
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'past',
        'user_id',
        'file_id',
      ],
      limit,
      offset: (page - 1) * limit,
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
          attributes: ['name', 'path', 'url'],
          required: true,
        },
      ],
      order: ['date'],
    });

    const meetups = {
      ...data,
      limit,
    };

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      file_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation false' });
    }

    const user_id = req.userId;

    const userIsOrganizer = await User.findOne({
      where: { id: user_id, organizer: true },
    });

    if (!userIsOrganizer) {
      return res
        .status(401)
        .json({ error: 'You can only create meetups with organizers.' });
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = zonedTimeToUtc(req.body.date, timezone);

    const { title, description, location, file_id } = req.body;

    if (isBefore(date, new Date())) {
      return res.status(401).json({ error: 'Paste dates are not permitted.' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      file_id,
      user_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      file_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ erro: 'Validation false' });
    }

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(401).json({ error: 'Paste dates are not permitted.' });
    }

    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
        user_id: req.userId,
      },
      attributes: [
        'id',
        'title',
        'description',
        'location',
        'date',
        'past',
        'past',
        'file_id',
      ],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['name', 'path', 'url'],
          required: true,
        },
      ],
    });

    if (!meetup) {
      return res
        .status(401)
        .json({ error: 'You can only update meetups you organize.' });
    }

    if (meetup.past) {
      return res
        .status(401)
        .json({ error: 'You can only update meetups without past dates.' });
    }

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = zonedTimeToUtc(req.body.date, timezone);

    const data = {
      ...req.body,
      date,
    };

    await meetup.update(data);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res
        .status(401)
        .json({ error: 'You can just cancel existing meetups.' });
    }

    if (meetup.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You can only cancel meetups you organize.' });
    }

    if (meetup.past) {
      return res
        .status(401)
        .json({ error: 'You can only cancel meetups without past dates.' });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
