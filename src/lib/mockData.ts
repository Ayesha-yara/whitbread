import { GroupBookingFormData } from '../types/form';

/**
 * In-memory storage for submitted form data
 */
let bookingSubmissions: GroupBookingFormData[] = [];

/**
 * Get all booking submissions
 */
export const getAllBookings = (): GroupBookingFormData[] => {
  return [...bookingSubmissions];
};

/**
 * Add a new booking submission
 */
export const addBooking = (booking: GroupBookingFormData): { id: string; data: GroupBookingFormData } => {
  const id = `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const bookingWithId = { ...booking };
  
  bookingSubmissions.push(bookingWithId);
  
  return { id, data: bookingWithId };
};

/**
 * Get a booking by index
 */
export const getBookingByIndex = (index: number): GroupBookingFormData | null => {
  if (index >= 0 && index < bookingSubmissions.length) {
    return bookingSubmissions[index];
  }
  return null;
};

/**
 * Clear all bookings (for testing)
 */
export const clearBookings = (): void => {
  bookingSubmissions = [];
};

/**
 * Sample locations for the booking form
 */
export const locations = [
  { id: 'london-central', name: 'London Central' },
  { id: 'london-kings-cross', name: 'London Kings Cross' },
  { id: 'manchester-central', name: 'Manchester Central' },
  { id: 'birmingham-city', name: 'Birmingham City Centre' },
  { id: 'edinburgh-central', name: 'Edinburgh Central' },
  { id: 'glasgow-central', name: 'Glasgow Central' },
  { id: 'cardiff-city', name: 'Cardiff City Centre' },
  { id: 'liverpool-central', name: 'Liverpool Central' },
  { id: 'leeds-city', name: 'Leeds City Centre' },
  { id: 'newcastle-central', name: 'Newcastle Central' },
];
