import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDate } from '@/lib/utils';
import { origin } from '@/lib/constants';
import { getCurrentUser } from '../../../lib/auth';

interface Event {
  id: string;
  name: string;
  description: string;
  organizingBody: string;
  venue: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  banner?: File | null;
  facultyInCharge: { email: string }; // Assuming facultyInCharge is an object with an email property
  facultyMembers: { email: string }[]; // Assuming facultyMembers is an array of objects with email properties
}

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Get the current logged-in user. (Assumes user object has email and role properties.)
  const user = getCurrentUser();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<Event[]>(`${origin}/api/events`);
        if (Array.isArray(response.data)) {
          // If the current user is a teacher, filter events based on their involvement.
          if (user && user.role.toLowerCase() === 'teacher') {
            const filteredEvents = response.data.filter((event) => {
              // Check if the user is the faculty in charge
              if (event.facultyInCharge.email === user.email) {
                return true;
              }
              // Check if the user is among the faculty members
              return event.facultyMembers.some(
                (member) => member.email === user.email
              );
            });
            setEvents(filteredEvents);
          } else {
            // For admins or others, display all events.
            setEvents(response.data);
          }
        } else {
          console.error('Received data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Events</h1>
          <p className="mt-2 text-sm text-gray-600">Manage your events here</p>
        </div>
      </div>

      {/* Display events */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
        {loading ? (
          <p className="p-4 text-center text-gray-500">Loading events...</p>
        ) : events.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Organizing Body</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Venue</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id}>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.name}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.organizingBody}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.venue}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {formatDate(event.startDate)} - {formatDate(event.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.status}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {event.facultyInCharge.email === user.email ? 'In-Charge' : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center text-gray-500">No events found</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
