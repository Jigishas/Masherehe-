const express = require('express');
const Event = require('../models/Event');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all events
router.get('/', async (req, res) => {
  try {
    const { type, location, date } = req.query;
    let query = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const events = await Event.find(query)
      .populate('creator', 'name email')
      .populate('attendees.user', 'name email')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('attendees.user', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create event
router.post('/', auth, async (req, res) => {
  try {
    const { name, type, date, location, dressCode, capacity, description, image, coordinates, privacy } = req.body;

    const event = new Event({
      name,
      type,
      date,
      location,
      dressCode,
      capacity,
      description,
      image,
      coordinates,
      privacy,
      creator: req.user.id
    });

    await event.save();

    // Add to user's created events
    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdEvents: event._id }
    });

    const populatedEvent = await Event.findById(event._id)
      .populate('creator', 'name email');

    res.json(populatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Join event
router.post('/:id/join', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user already joined
    const alreadyJoined = event.attendees.some(attendee => 
      attendee.user.toString() === req.user.id
    );

    if (alreadyJoined) {
      return res.status(400).json({ message: 'Already joined this event' });
    }

    // Check capacity
    if (event.attendees.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is at full capacity' });
    }

    // Add user to attendees
    event.attendees.push({ user: req.user.id });
    await event.save();

    // Add to user's joined events
    await User.findByIdAndUpdate(req.user.id, {
      $push: { joinedEvents: event._id }
    });

    const updatedEvent = await Event.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('attendees.user', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Leave event
router.post('/:id/leave', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(attendee => 
      attendee.user.toString() !== req.user.id
    );
    await event.save();

    // Remove from user's joined events
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { joinedEvents: event._id }
    });

    const updatedEvent = await Event.findById(req.params.id)
      .populate('creator', 'name email')
      .populate('attendees.user', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update event (only creator)
router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('creator', 'name email')
     .populate('attendees.user', 'name email');

    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete event (only creator)
router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Event.findByIdAndDelete(req.params.id);

    // Remove from users' joined/created events
    await User.updateMany(
      { joinedEvents: req.params.id },
      { $pull: { joinedEvents: req.params.id } }
    );
    await User.updateMany(
      { createdEvents: req.params.id },
      { $pull: { createdEvents: req.params.id } }
    );

    res.json({ message: 'Event deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
