import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const mockEvents = [
  {
    id: '1',
    name: 'Technical Workshop Series',
    description: 'A series of technical workshops for students',
    department: 'Computer Science',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'registered'
  },
  {
    id: '2',
    name: 'Guest Lecture',
    description: 'Industry expert session',
    department: 'Computer Science',
    startDate: '2024-04-05',
    endDate: '2024-04-05',
    status: 'open'
  }
];

const StudentEvents: React.FC = () => {
  const [events] = useState(mockEvents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Events</h1>
        <p className="mt-2 text-sm text-gray-600">Browse and register for upcoming events</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{event.name}</h3>
              <p className="mt-2 text-sm text-gray-500">{event.description}</p>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Department:</span> {event.department}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Date:</span> {formatDate(event.startDate)}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className={cn(
                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                    event.status === 'registered'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  )}>
                    {event.status === 'registered' ? 'Registered' : 'Registration Open'}
                  </span>
                  <Button
                    variant={event.status === 'registered' ? 'outline' : 'primary'}
                    size="sm"
                  >
                    {event.status === 'registered' ? 'View Details' : 'Register'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentEvents;