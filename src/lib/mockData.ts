import { GroupBookingFormData } from '../types/form';


export interface StoredBooking {
  id: string;
  referenceNumber: string;
  submittedAt: string;
  data: GroupBookingFormData;
}


let bookingSubmissions: StoredBooking[] = [];


export const getAllBookings = (): StoredBooking[] => {
  return [...bookingSubmissions];
};

export const generateReferenceNumber = (): string => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  
  return `PI-${year}${month}${day}-${random}`;
};

export const addBooking = (booking: GroupBookingFormData): StoredBooking => {
  const id = `booking-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  const referenceNumber = generateReferenceNumber();
  const submittedAt = new Date().toISOString();
  
  const storedBooking: StoredBooking = {
    id,
    referenceNumber,
    submittedAt,
    data: { ...booking }
  };
  
  bookingSubmissions.push(storedBooking);
  
  return storedBooking;
};

export const getBookingByReference = (referenceNumber: string): StoredBooking | null => {
  const booking = bookingSubmissions.find(b => b.referenceNumber === referenceNumber);
  return booking || null;
};

export const getBookingByIndex = (index: number): StoredBooking | null => {
  if (index >= 0 && index < bookingSubmissions.length) {
    return bookingSubmissions[index];
  }
  return null;
};

export const clearAllBookings = (): void => {
  bookingSubmissions = [];
};

export const getBookingCount = (): number => {
  return bookingSubmissions.length;
};


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
