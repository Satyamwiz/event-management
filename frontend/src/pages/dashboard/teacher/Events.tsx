import React, { useState } from 'react';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const mockEvents = [
  {
    id: '1',
    name: 'Technical Workshop Series',
    description: 'A series of technical workshops for students',
    role: 'Coordinator',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'active'
  },
  {
    id: '2',
    name: 'Guest Lecture',
    description: 'Industry expert session',
    role: 'Facilitator',
    startDate: '2024-04-05',
    endDate: '2024-04-05',
    status: 'upcoming'
  }
];

const TeacherEvents: React.FC = () => {
  const [events] = useState(mockEvents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Events</h1>
        <p className="mt-2 text-sm text-gray-600">View and manage your assigned events</p>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Event Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="relative py-3.5 pl-3 pr-4">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {events.map((event) => (
              <tr key={event.id}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                  <div className="font-medium text-gray-900">{event.name}</div>
                  <div className="text-gray-500">{event.description}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.role}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {formatDate(event.startDate)}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={cn(
                    'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
                    event.status === 'active'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  )}>
                    {event.status}
                  </span>
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
                  <Button variant="ghost" size="sm">View Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherEvents;