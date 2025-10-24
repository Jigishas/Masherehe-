import React from 'react';
import { Button } from './ui/button';
import { Search, Filter } from 'lucide-react';

const Filters = ({ filters, onFiltersChange, onSearch }) => {
  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'other', label: 'Other' },
  ];

  const handleTypeChange = (type) => {
    onFiltersChange({ ...filters, type: type === 'all' ? '' : type });
  };

  const handleLocationChange = (e) => {
    onFiltersChange({ ...filters, location: e.target.value });
  };

  const handleDateChange = (e) => {
    onFiltersChange({ ...filters, date: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-600" />
        <h3 className="text-lg font-semibold">Filter Events</h3>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <Button
                key={type.value}
                type="button"
                variant={filters.type === (type.value === 'all' ? '' : type.value) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTypeChange(type.value)}
              >
                {type.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Location and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location..."
              value={filters.location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={handleDateChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-end">
          <Button type="submit" className="flex items-center gap-2">
            <Search size={16} />
            Search Events
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
