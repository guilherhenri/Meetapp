import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Subscription from '../models/Subscription';
import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import SubscriptionMail from '../jobs/SubscriptionMail';
import Queue from '../../lib/Queue';

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await Subscription.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'meetup_id'],
      include: [
        {
          model: Meetup,
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'past',
            'file_id',
          ],
          where: {
            date: {
              [Op.gt]: new Date(),
            },
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
              attributes: ['name', 'path', 'url'],
              required: true,
            },
          ],
          required: true,
        },
      ],
      order: [[Meetup, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);

    const { meetupId } = req.params;

    const meetup = await Meetup.findByPk(meetupId, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
          required: true,
        },
      ],
    });

    if (!meetup) {
      return res
        .status(401)
        .json({ error: 'You can only register yourself meetups existing.' });
    }

    if (meetup.user_id === user.id) {
      return res.status(401).json({
        error: 'You can only register yourself meetups not organize.',
      });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(401).json({
        error: 'You can only register yourself meetups without past dates.',
      });
    }

    const checkSubscription = await Subscription.findOne({
      where: {
        user_id: user.id,
        meetup_id: meetupId,
      },
    });

    if (checkSubscription) {
      return res.status(401).json({
        error: 'You can only register yourself meetups one time.',
      });
    }

    const checkAvailability = await Subscription.findAll({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          where: {
            date: meetup.date,
          },
          required: true,
        },
      ],
    });

    if (checkAvailability.length > 0) {
      return res.status(401).json({
        error: "you can't register yourself for two meetups at the same time.",
      });
    }

    const subscription = await Subscription.create({
      meetup_id: meetupId,
      user_id: user.id,
    });

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.meetupId, {
      include: [
        {
          model: Meetup,
          attributes: ['date', 'past'],
        },
      ],
    });

    if (!subscription) {
      return res
        .status(401)
        .json({ error: 'You can just cancel existing subscriptions.' });
    }

    if (subscription.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You can only cancel subscriptions that are yours.' });
    }

    if (subscription.Meetup.past) {
      return res.status(401).json({
        error: 'You can only cancel subscriptions without past dates.',
      });
    }

    await subscription.destroy();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
