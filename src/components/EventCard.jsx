import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Calendar, MapPin, Users, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const EventCard = ({ event, onJoin, onLeave }) => {
  const { isAuthenticated, user } = useAuth();

  const isJoined = event.attendees?.some(attendee => attendee.user._id === user?._id);
  const isCreator = event.creator._id === user?._id;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getEventTypeColor = (type) => {
    const colors = {
      birthday: 'bg-pink-100 text-pink-800',
      wedding: 'bg-rose-100 text-rose-800',
      anniversary: 'bg-red-100 text-red-800',
      graduation: 'bg-blue-100 text-blue-800',
      'baby-shower': 'bg-purple-100 text-purple-800',
      holiday: 'bg-green-100 text-green-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type] || colors.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Event Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-lg font-semibold capitalize">{event.type}</div>
        </div>
      </div>

      <div className="p-6">
        {/* Event Type Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
          <div className="text-right">
            <div className="text-sm text-gray-500">Capacity</div>
            <div className="flex items-center text-sm">
              <Users size={16} className="mr-1" />
              {event.attendeeCount || 0}/{event.capacity}
            </div>
          </div>
        </div>

        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <User size={16} className="mr-2" />
            <span>by {event.creator.name}</span>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link to={`/events/${event._id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>

          {isAuthenticated && !isCreator && (
            <Button
              onClick={() => isJoined ? onLeave(event._id) : onJoin(event._id)}
              variant={isJoined ? "secondary" : "default"}
              className="flex-1"
            >
              {isJoined ? 'Leave Event' : 'Join Event'}
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
