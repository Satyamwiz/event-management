import React, { useEffect, useState } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser, getEventCount, getStudentCount } from '../../../lib/auth';

interface Event {
  id: number;
  name: string;
  organizingBody: string;
  venue: string;
  startDate: string;
  endDate: string;
  status: string;
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const TeacherDashboard: React.FC = () => {
  const [eventCount, setEventCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Replace 'origin' with your API base URL if necessary.
        const response = await axios.get<Event[]>(`${origin}/api/events`);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEventCount = async () => {
      const data = await getEventCount();
      console.log('Event data:', data);
      const { upcoming } = data;
      setEventCount(upcoming);
      console.log('Event count:', upcoming);
    };

    const fetchStudentCount = async () => {
      const data = await getStudentCount();
      setStudentCount(data);
      console.log('Student count:', data);
    };

    fetchEventCount();
    fetchStudentCount();
    fetchEvents();
  }, []);

  const user = getCurrentUser();
  if (user?.role !== 'TEACHER' && user?.role !== 'teacher') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Teacher Dashboard
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome back! Here's an overview of your events and responsibilities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Calendar className="h-6 w-6 text-gray-400" />
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Events
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {eventCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <Users className="h-6 w-6 text-gray-400" />
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Student Registrations
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {studentCount}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Events Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Events</h2>
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Event Name</th>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Organizing Body</th>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Venue</th>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Date Range</th>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="whitespace-nowrap px-3 py-4 text-left text-sm font-medium text-gray-500">Actions</th>
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
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Actions</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No events available</p>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
