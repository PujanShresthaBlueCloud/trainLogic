// lib/google-calendar.ts
// Google Calendar Integration for Venue Booking

import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Initialize Google Calendar client
export function getCalendarClient() {
  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
}

// Venue time slots configuration
export const VENUE_SLOTS = {
  lunch: {
    start: '10:00',
    end: '15:00',
    displayName: 'Lunch Service'
  },
  dinner: {
    start: '17:00',
    end: '22:00',
    displayName: 'Dinner Service'
  }
} as const;

export type MealType = keyof typeof VENUE_SLOTS;

// Check if venue is available for specific date and meal type
export async function checkVenueAvailability(
  date: string, // YYYY-MM-DD
  mealType: MealType
): Promise<{
  available: boolean;
  conflictingEvent?: any;
}> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    
    const slot = VENUE_SLOTS[mealType];
    const startDateTime = `${date}T${slot.start}:00`;
    const endDateTime = `${date}T${slot.end}:00`;

    console.log('Checking availability:', { date, mealType, startDateTime, endDateTime });

    // Query Google Calendar for events in this time range
    const response = await calendar.events.list({
      calendarId,
      timeMin: startDateTime,
      timeMax: endDateTime,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    // Check if any event conflicts with venue booking
    const conflictingEvent = events.find(event => {
      // Skip cancelled events
      if (event.status === 'cancelled') return false;
      
      // Check if event is a venue booking
      const isVenueBooking = event.summary?.includes('Venue Booking') || 
                            event.extendedProperties?.private?.type === 'venue_booking';
      
      return isVenueBooking;
    });

    return {
      available: !conflictingEvent,
      conflictingEvent: conflictingEvent || undefined
    };

  } catch (error) {
    console.error('Error checking availability:', error);
    throw new Error('Failed to check calendar availability');
  }
}

// Find alternative available slots
export async function findAlternativeSlots(
  startDate: string, // YYYY-MM-DD
  mealType: MealType,
  daysAhead: number = 14
): Promise<Array<{
  date: string;
  mealType: MealType;
  displayDate: string;
  displayTime: string;
}>> {
  const alternatives: Array<{
    date: string;
    mealType: MealType;
    displayDate: string;
    displayTime: string;
  }> = [];

  const start = new Date(startDate);
  
  // Search for next 14 days
  for (let i = 1; i <= daysAhead && alternatives.length < 3; i++) {
    const checkDate = new Date(start);
    checkDate.setDate(start.getDate() + i);
    const dateStr = checkDate.toISOString().split('T')[0];

    // Check same meal type first
    const sameMealAvailability = await checkVenueAvailability(dateStr, mealType);
    if (sameMealAvailability.available) {
      alternatives.push({
        date: dateStr,
        mealType,
        displayDate: checkDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        displayTime: `${VENUE_SLOTS[mealType].start} - ${VENUE_SLOTS[mealType].end}`
      });
      continue;
    }

    // If same meal type not available, try other meal type
    const otherMealType: MealType = mealType === 'lunch' ? 'dinner' : 'lunch';
    const otherMealAvailability = await checkVenueAvailability(dateStr, otherMealType);
    
    if (otherMealAvailability.available) {
      alternatives.push({
        date: dateStr,
        mealType: otherMealType,
        displayDate: checkDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        displayTime: `${VENUE_SLOTS[otherMealType].start} - ${VENUE_SLOTS[otherMealType].end}`
      });
    }
  }

  return alternatives.slice(0, 3); // Return max 3 alternatives
}

// Create venue booking in Google Calendar
export async function createVenueBooking(params: {
  date: string; // YYYY-MM-DD
  mealType: MealType;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfGuests?: number;
  specialRequests?: string;
  bookingId: string;
}): Promise<{
  success: boolean;
  eventId?: string;
  eventLink?: string;
  error?: string;
}> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;
    
    const slot = VENUE_SLOTS[params.mealType];
    const startDateTime = `${params.date}T${slot.start}:00`;
    const endDateTime = `${params.date}T${slot.end}:00`;

    // Create event
    const event = {
      summary: `Venue Booking - ${params.customerName}`,
      description: `
        Venue Booking Confirmation
        
        Customer: ${params.customerName}
        Email: ${params.customerEmail}
        Phone: ${params.customerPhone}
        Meal Type: ${slot.displayName}
        Number of Guests: ${params.numberOfGuests || 1}
        ${params.specialRequests ? `\nSpecial Requests: ${params.specialRequests}` : ''}
        
        Booking ID: ${params.bookingId}
      `.trim(),
      start: {
        dateTime: startDateTime,
        timeZone: 'Australia/Sydney',
      },
      end: {
        dateTime: endDateTime,
        timeZone: 'Australia/Sydney',
      },
      attendees: [
        { email: params.customerEmail, displayName: params.customerName }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 120 }, // 2 hours before
        ],
      },
      extendedProperties: {
        private: {
          type: 'venue_booking',
          booking_id: params.bookingId,
          meal_type: params.mealType,
          customer_phone: params.customerPhone,
          number_of_guests: String(params.numberOfGuests || 1)
        }
      },
      colorId: params.mealType === 'lunch' ? '5' : '11', // Yellow for lunch, red for dinner
    };

    const response = await calendar.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: 'all', // Send email notification to attendees
    });

    console.log('Created Google Calendar event:', response.data.id);

    return {
      success: true,
      eventId: response.data.id || undefined,
      eventLink: response.data.htmlLink || undefined,
    };

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Cancel venue booking
export async function cancelVenueBooking(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;

    await calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates: 'all', // Notify attendees
    });

    console.log('Cancelled Google Calendar event:', eventId);
    return true;

  } catch (error) {
    console.error('Error cancelling event:', error);
    return false;
  }
}

// Get booking details from Google Calendar
export async function getBookingDetails(eventId: string) {
  try {
    const calendar = getCalendarClient();
    const calendarId = process.env.GOOGLE_CALENDAR_ID!;

    const response = await calendar.events.get({
      calendarId,
      eventId,
    });

    return response.data;

  } catch (error) {
    console.error('Error getting event details:', error);
    return null;
  }
}

// Validate date format and check if it's in the future
export function validateBookingDate(dateStr: string): {
  valid: boolean;
  error?: string;
  date?: Date;
} {
  try {
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
      return { valid: false, error: 'Invalid date format. Use YYYY-MM-DD' };
    }

    if (date < today) {
      return { valid: false, error: 'Cannot book dates in the past' };
    }

    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 90); // 90 days advance booking

    if (date > maxDate) {
      return { valid: false, error: 'Cannot book more than 90 days in advance' };
    }

    return { valid: true, date };

  } catch (error) {
    return { valid: false, error: 'Invalid date' };
  }
}

// Convert 12-hour time to 24-hour format
export function convertTo24Hour(time12h: string): string {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  
  if (hours === '12') {
    hours = '00';
  }
  
  if (modifier?.toUpperCase() === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }
  
  return `${hours.padStart(2, '0')}:${minutes || '00'}`;
}