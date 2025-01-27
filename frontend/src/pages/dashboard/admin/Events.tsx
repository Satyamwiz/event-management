import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import cn from 'classnames';

const mockEvents = [
  {
    id: '1',
    name: 'Annual Tech Symposium',
    description: 'A gathering of tech enthusiasts and industry experts',
    organizingBody: 'Computer Science Department',
    venue: 'Main Auditorium',
    startDate: '2024-04-15',
    endDate: '2024-04-16',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Cultural Fest',
    description: 'Annual cultural celebration',
    organizingBody: 'Student Council',
    venue: 'College Ground',
    startDate: '2024-03-20',
    endDate: '2024-03-22',
    status: 'active'
  }
];

const AdminEvents: React.FC = () => {
  const [events] = useState(mockEvents);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all events here</p>
        </div>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </Button>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Organizing Body</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Venue</th>
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
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {event.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.organizingBody}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {event.venue}
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
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEvents;