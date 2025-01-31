
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import cn from 'classnames';
import { origin } from '@/lib/constants';

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
  facultyInCharge: string;
  facultyMembers: string[];
}

interface Faculty {
  email: string;
  name: string;
  department:string,

}

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    id: '', name: '', description: '', organizingBody: '', venue: '', startDate: '', endDate: '', status: 'upcoming', facultyInCharge: '', facultyMembers: []
  });
  const [banner, setBanner] = useState<File | null>(null);
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
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

    const fetchFacultyMembers = async () => {
      try {
        const response = await axios.get<Faculty[]>(`${origin}/api/users`);
        setFacultyList(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch faculty members:', error);
      }
    };

    fetchEvents();
    fetchFacultyMembers();
  }, []);

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value, type } = e.target;
  //   if (type === 'select-one' || type === 'select-multiple') {
  //     const selectElement = e.target as HTMLSelectElement;
  //     const selectedValues = Array.from(selectElement.selectedOptions, option => option.value);
  //     setNewEvent({
  //       ...newEvent,
  //       [name]: selectedValues.length ? selectedValues : value,
  //     });
  //   } else {
  //     setNewEvent({
  //       ...newEvent,
  //       [name]: value,
  //     });
  //   }
  // };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, multiple } = e.target;
    
    if (type === 'select-one') {
      setNewEvent({ ...newEvent, [name]: value });
    } else if (multiple) {
      const selectElement = e.target as HTMLSelectElement;
      const selectedValues = Array.from(selectElement.selectedOptions, option => option.value);
      setNewEvent({ ...newEvent, [name]: selectedValues });
    } else {
      setNewEvent({ ...newEvent, [name]: value });
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
    }
  };

  const handleAddEvent = async (e) => {
    try {
      e.preventDefault(); // Prevent form submission

      const formData = new FormData();
      formData.append('name', newEvent.name);
      formData.append('description', newEvent.description);
      formData.append('organizingBody', newEvent.organizingBody);
      formData.append('venue', newEvent.venue);
      formData.append('startDate', newEvent.startDate);
      formData.append('endDate', newEvent.endDate);
      formData.append('status', newEvent.status);
      formData.append('facultyInCharge', newEvent.facultyInCharge);
      formData.append('facultyMembers', JSON.stringify(newEvent.facultyMembers));
      console.log(formData);

      // if (banner) {
      //   formData.append('banner', banner);
      // }
      console.log("hehe");
      console.log(formData);
      console.log(newEvent)
      const response = await axios.post(`${origin}/api/events`, newEvent, {
        // headers: { 'Content-Type': 'multipart/form-data' }
      });
        console.log("sendede");

      if (response.status == 200 || response.data.message) {
        window.location.reload();

        setEvents([...events, response.data]);
        setShowModal(false);
        setNewEvent({
          id: '', name: '', description: '', organizingBody: '', venue: '', startDate: '', endDate: '', status: 'upcoming', facultyInCharge: '', facultyMembers: []
        });
        setBanner(null);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Events</h1>
          <p className="mt-2 text-sm text-gray-600">Manage all events here</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <Plus className="h-5 w-5 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Modal for adding event */}
      {showModal && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-screen-md w-full max-h-screen overflow-y-auto">
      <h2 className="text-xl font-semibold">Add New Event</h2>
      <form className="space-y-4 mt-4">
        {/* Event Details */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newEvent.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={newEvent.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="organizingBody" className="block text-sm font-medium text-gray-700">Organizing Body</label>
          <input
            type="text"
            id="organizingBody"
            name="organizingBody"
            value={newEvent.organizingBody}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
          <input
            type="text"
            id="venue"
            name="venue"
            value={newEvent.venue}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={newEvent.startDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={newEvent.endDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
          <select
            id="status"
            name="status"
            value={newEvent.status}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="upcoming">Upcoming</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label htmlFor="facultyInCharge" className="block text-sm font-medium text-gray-700">Faculty In Charge</label>
          <select
            id="facultyInCharge"
            name="facultyInCharge"
            value={newEvent.facultyInCharge}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Faculty</option>
            {facultyList.map(faculty => (
              <option key={faculty.email} value={faculty.email}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Replace the existing facultyMembers select with this checkbox group */}
        <div>
  <label className="block text-sm font-medium text-gray-700">Faculty Members</label>
  {/* Scrollable container */}
  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
    {facultyList.map(faculty => (
      <div key={faculty.email} className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            type="checkbox"
            id={`faculty-${faculty.email}`}
            value={faculty.email}
            checked={newEvent.facultyMembers.includes(faculty.email)}
            onChange={(e) => {
              const email = e.target.value;
              setNewEvent(prev => ({
                ...prev,
                facultyMembers: e.target.checked
                  ? [...prev.facultyMembers, email]
                  : prev.facultyMembers.filter(f => f !== email)
              }));
            }}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={`faculty-${faculty.email}`} className="font-medium text-gray-900">
            {faculty.name}
          </label>
          <p className="text-gray-500">{faculty.department}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        {/* <div>
          <label htmlFor="facultyMembers" className="block text-sm font-medium text-gray-700">Faculty Members</label>
          <select
            id="facultyMembers"
            name="facultyMembers"
            multiple
            value={newEvent.facultyMembers}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {facultyList.map(faculty => (
              <option key={faculty.email} value={faculty.email}>
                {faculty.name}
              </option>
            ))}
          </select>
        </div> */}

        <div>
          <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Event Banner</label>
          <input
            type="file"
            id="banner"
            name="banner"
            accept="image/*"
            onChange={handleBannerChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-4">
          <Button onClick={() => setShowModal(false)} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} size="sm">
            Save Event
          </Button>
        </div>
      </form>
    </div>
  </div>
)}


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
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map(event => (
                <tr key={event.venue}>
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
        ) : (
          <p className="p-4 text-center text-gray-500">No events found</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
