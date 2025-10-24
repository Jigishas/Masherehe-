import React, { useState, useEffect } from 'react';
import { eventsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Filters from '../components/Filters';
import EventsGrid from '../components/EventsGrid';
import Map from '../components/Map';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    location: '',
    date: ''
  });
  const [locationLoading, setLocationLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchEvents();
    fetchUserLocation();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getEvents(filters);
      setEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
      alert('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Reverse geocode to get location name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const locationName = `${data.city}, ${data.principalSubdivision}`;
            setFilters(prev => ({ ...prev, location: locationName }));
          } catch (error) {
            console.error('Failed to reverse geocode:', error);
            // Fallback to coordinates
            setFilters(prev => ({ ...prev, location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` }));
          }
          setLocationLoading(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLocationLoading(false);
          // Don't show alert, just continue without location
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = () => {
    fetchEvents();
  };

  const handleJoinEvent = async (eventId) => {
    if (!isAuthenticated) {
      alert('Please login to join events');
      return;
    }

    try {
      await eventsAPI.joinEvent(eventId);
      alert('Successfully joined the event!');
      fetchEvents(); // Refresh events
    } catch (error) {
      console.error('Failed to join event:', error);
      alert(error.response?.data?.message || 'Failed to join event');
    }
  };

  const handleLeaveEvent = async (eventId) => {
    try {
      await eventsAPI.leaveEvent(eventId);
      alert('Successfully left the event');
      fetchEvents(); // Refresh events
    } catch (error) {
      console.error('Failed to leave event:', error);
      alert(error.response?.data?.message || 'Failed to leave event');
    }
  };

  return (
    <div>
      <div className="container">
        <div className="main-content">
          <div className="content-primary">
            {/* Filters Section */}
            <div className="filters">
              <h2><i className="fas fa-filter"></i> Find Celebrations</h2>
              <div className="filter-group">
                <label htmlFor="locationFilter">Location</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    id="locationFilter"
                    className="filter-control"
                    placeholder={locationLoading ? "Getting your location..." : "Enter your location"}
                    value={filters.location}
                    onChange={(e) => handleFiltersChange({ ...filters, location: e.target.value })}
                    disabled={locationLoading}
                  />
                  <button
                    type="button"
                    onClick={fetchUserLocation}
                    disabled={locationLoading}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      cursor: locationLoading ? 'not-allowed' : 'pointer',
                      fontSize: '16px'
                    }}
                    title="Get current location"
                  >
                    <i className={`fas ${locationLoading ? 'fa-spinner fa-spin' : 'fa-map-marker-alt'}`}></i>
                  </button>
                </div>
              </div>
              <div className="form-row">
                <div className="filter-group">
                  <label htmlFor="dateFilter">Date</label>
                  <input
                    type="date"
                    id="dateFilter"
                    className="filter-control"
                    value={filters.date}
                    onChange={(e) => handleFiltersChange({ ...filters, date: e.target.value })}
                  />
                </div>
                <div className="filter-group">
                  <label htmlFor="typeFilter">Event Type</label>
                  <select
                    id="typeFilter"
                    className="filter-control"
                    value={filters.type}
                    onChange={(e) => handleFiltersChange({ ...filters, type: e.target.value })}
                  >
                    <option value="">All Types</option>
                    <option value="birthday">Birthday</option>
                    <option value="wedding">Wedding</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="graduation">Graduation</option>
                    <option value="baby-shower">Baby Shower</option>
                    <option value="holiday">Holiday Party</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="filter-actions">
                <button className="btn btn-primary" onClick={handleSearch}>
                  <i className="fas fa-search"></i> Search Events
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleFiltersChange({ type: '', location: '', date: '' })}
                >
                  <i className="fas fa-redo"></i> Reset
                </button>
              </div>
            </div>

            {/* Events Grid */}
            <EventsGrid
              events={events}
              onJoin={handleJoinEvent}
              onLeave={handleLeaveEvent}
              loading={loading}
            />
          </div>

          <div className="content-sidebar">
            {/* Map Section */}
            <div className="map-section">
              <div className="map-header">
                <h2><i className="fas fa-map-marker-alt"></i> Events Near You</h2>
              </div>
              <Map events={events} />
            </div>

            {/* Quick Stats */}
            <div className="filters">
              <h2><i className="fas fa-chart-pie"></i> Quick Stats</h2>
              <div className="event-meta">
                <div className="event-meta-item">
                  <i className="fas fa-users"></i>
                  <span>Active Events: <strong>{events.length}</strong></span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Events in Your Area: <strong>{events.filter(e => e.location.toLowerCase().includes('new york') || e.location.toLowerCase().includes('manhattan') || e.location.toLowerCase().includes('brooklyn') || e.location.toLowerCase().includes('queens')).length}</strong></span>
                </div>
                <div className="event-meta-item">
                  <i className="fas fa-calendar-day"></i>
                  <span>Events Today: <strong>{events.filter(event => new Date(event.date).toDateString() === new Date().toDateString()).length}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
