// import React, { useEffect, useState } from 'react';
// import { Plus } from 'lucide-react';
// import axios from 'axios';
// import Button from '@/components/ui/Button';
// import { formatDate } from '@/lib/utils';
// import cn from 'classnames';
// import { origin } from '@/lib/constants';

// // const mockEvents = [
// //   {
// //     id: '1',
// //     name: 'Annual Tech Symposium',
// //     description: 'A gathering of tech enthusiasts and industry experts',
// //     organizingBody: 'Computer Science Department',
// //     venue: 'Main Auditorium',
// //     startDate: '2024-04-15',
// //     endDate: '2024-04-16',
// //     status: 'upcoming'
// //   },
// //   {
// //     id: '2',
// //     name: 'Cultural Fest',
// //     description: 'Annual cultural celebration',
// //     organizingBody: 'Student Council',
// //     venue: 'College Ground',
// //     startDate: '2024-03-20',
// //     endDate: '2024-03-22',
// //     status: 'active'
// //   }
// // ];
// interface Event {
//   id: string;
//   name: string;
//   description: string;
//   organizingBody: string;
//   venue: string;
//   startDate: string;
//   endDate: string;
//   status: 'upcoming' | 'active' | 'completed';
// }

// const AdminEvents: React.FC = () => {
//   const [events, setEvents] = useState<Event[]>([]);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await axios.get<Event[]>(`${origin}/api/events`);
//         setEvents(response.data);
//       } catch (error) {
//         console.error('Failed to fetch events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-gray-900">Events</h1>
//           <p className="mt-2 text-sm text-gray-600">Manage all events here</p>
//         </div>
//         <Button>
//           <Plus className="h-5 w-5 mr-2" />
//           Add Event
//         </Button>
//       </div>

//       <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead>
//             <tr>
//               <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Organizing Body</th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Venue</th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
//               <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
//               <th className="relative py-3.5 pl-3 pr-4">
//                 <span className="sr-only">Actions</span>
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {events.map((event) => (
//               <tr key={event.id}>
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
//                   {event.name}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {event.organizingBody}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {event.venue}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {formatDate(event.startDate)}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm">
//                   <span className={cn(
//                     'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
//                     event.status === 'active' 
//                       ? 'bg-green-50 text-green-700'
//                       : 'bg-yellow-50 text-yellow-700'
//                   )}>
//                     {event.status}
//                   </span>
//                 </td>
//                 <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium">
//                   <Button variant="ghost" size="sm">Edit</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default AdminEvents;
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
}

const AdminEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    id: '', name: '', description: '', organizingBody: '', venue: '', startDate: '', endDate: '', status: 'upcoming'
  });
  const [banner, setBanner] = useState<File | null>(null); 

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

    fetchEvents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'select-one') {
      const selectElement = e.target as HTMLSelectElement;
      setNewEvent({
        ...newEvent,
        [name]: selectElement.options[selectElement.selectedIndex].value,
      });
    } else {
      setNewEvent({
        ...newEvent,
        [name]: value,
      });
    }
  };

 
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
    }
  };

  const handleAddEvent = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newEvent.name);
      formData.append('description', newEvent.description);
      formData.append('organizingBody', newEvent.organizingBody);
      formData.append('venue', newEvent.venue);
      formData.append('startDate', newEvent.startDate);
      formData.append('endDate', newEvent.endDate);
      formData.append('status', newEvent.status);

      if (banner) {
        formData.append('banner', banner); 
      }

      const response = await axios.post(`${origin}/api/events`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 200) {
        setEvents([...events, response.data]); 
        setShowModal(false); 
        setNewEvent({
          id: '', name: '', description: '', organizingBody: '', venue: '', startDate: '', endDate: '', status: 'upcoming'
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
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold">Add New Event</h2>
            <form className="space-y-4 mt-4">
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
              {/* Banner image upload field */}
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
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.organizingBody}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.venue}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(event.startDate)} - {formatDate(event.endDate)}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{event.status}</td>
                  <td className="relative whitespace-nowrap py-3.5 pl-3 pr-4 text-sm font-medium">
                    {/* Add actions here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="p-4 text-center text-gray-500">No events available</p>
        )}
      </div>
    </div>
  );
};

export default AdminEvents;
