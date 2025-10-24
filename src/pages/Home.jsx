import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Celebration Connect
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Discover amazing events happening around you and create your own celebrations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-semibold mb-2">Find Events</h3>
              <p className="text-gray-600">Browse through various celebrations and join the ones that interest you.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Connect with People</h3>
              <p className="text-gray-600">Meet new people and build lasting connections through shared experiences.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎊</div>
              <h3 className="text-xl font-semibold mb-2">Create Memories</h3>
              <p className="text-gray-600">Organize your own events and create unforgettable moments.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
