// import { google } from 'googleapis';

// const calendar = google.calendar({
//   version: 'v3',
//   auth: new google.auth.JWT(
//     process.env.GOOGLE_CLIENT_EMAIL,
//     null,
//     process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     ['https://www.googleapis.com/auth/calendar']
//   )
// });

// export const createCalendarEvent = async (event) => {
//   try {
//     const calendarEvent = {
//       summary: event.name,
//       description: event.description,
//       location: event.venue,
//       start: {
//         dateTime: event.startDate,
//         timeZone: 'Asia/Kolkata',
//       },
//       end: {
//         dateTime: event.endDate,
//         timeZone: 'Asia/Kolkata',
//       },
//       attendees: [],
//       reminders: {
//         useDefault: false,
//         overrides: [
//           { method: 'email', minutes: 24 * 60 },
//           { method: 'popup', minutes: 30 },
//         ],
//       },
//     };

//     const response = await calendar.events.insert({
//       calendarId: 'primary',
//       resource: calendarEvent,
//     });

//     return response.data.id;
//   } catch (error) {
//     console.error('Error creating calendar event:', error);
//     throw error;
//   }
// };

// export const updateCalendarEvent = async (eventId, updatedEvent) => {
//   try {
//     const calendarEvent = {
//       summary: updatedEvent.name,
//       description: updatedEvent.description,
//       location: updatedEvent.venue,
//       start: {
//         dateTime: updatedEvent.startDate,
//         timeZone: 'Asia/Kolkata',
//       },
//       end: {
//         dateTime: updatedEvent.endDate,
//         timeZone: 'Asia/Kolkata',
//       },
//     };

//     await calendar.events.update({
//       calendarId: 'primary',
//       eventId: eventId,
//       resource: calendarEvent,
//     });
//   } catch (error) {
//     console.error('Error updating calendar event:', error);
//     throw error;
//   }
// };

// export const deleteCalendarEvent = async (eventId) => {
//   try {
//     await calendar.events.delete({
//       calendarId: 'primary',
//       eventId: eventId,
//     });
//   } catch (error) {
//     console.error('Error deleting calendar event:', error);
//     throw error;
//   }
// };