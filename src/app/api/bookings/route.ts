import { NextRequest, NextResponse } from 'next/server';
import { addBooking, getAllBookings } from '@/lib/mockData';
import { GroupBookingFormData } from '@/types/form';

/**
 * GET /api/bookings
 * Returns all booking submissions
 */
export async function GET() {
  try {
    const bookings = getAllBookings();
    return NextResponse.json({ success: true, data: bookings }, { status: 200 });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/bookings
 * Creates a new booking submission
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    if (!isValidBookingData(body)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid booking data',
          errors: validateBookingData(body)
        },
        { status: 400 }
      );
    }
    
    // Add the booking to our mock database
    const { id, data } = addBooking(body as GroupBookingFormData);
    
    // Simulate a slight delay to mimic a real API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking submitted successfully',
        referenceNumber: id,
        data 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create booking' },
      { status: 500 }
    );
  }
}

/**
 * Basic validation for booking data
 */
function isValidBookingData(data: unknown): boolean {
  if (!data || typeof data !== 'object' || data === null) return false;
  
  const bookingData = data as Record<string, unknown>;
  
  if (!bookingData.contactDetails || 
      !bookingData.bookingDetails || 
      !bookingData.roomRequirements ||
      typeof bookingData.contactDetails !== 'object' ||
      typeof bookingData.bookingDetails !== 'object' ||
      typeof bookingData.roomRequirements !== 'object') {
    return false;
  }
  
  const contactDetails = bookingData.contactDetails as Record<string, unknown>;
  if (!contactDetails.firstName || 
      !contactDetails.lastName || 
      !contactDetails.email || 
      !contactDetails.phoneNumber ||
      typeof contactDetails.firstName !== 'string' ||
      typeof contactDetails.lastName !== 'string' ||
      typeof contactDetails.email !== 'string' ||
      typeof contactDetails.phoneNumber !== 'string') {
    return false;
  }
  
  const bookingDetails = bookingData.bookingDetails as Record<string, unknown>;
  if (!bookingDetails.dates || typeof bookingDetails.dates !== 'object') {
    return false;
  }
  
  const roomRequirements = bookingData.roomRequirements as Record<string, unknown>;
  if (!roomRequirements.rooms || typeof roomRequirements.rooms !== 'object') {
    return false;
  }
  
  return true;
}

/**
 * Returns validation errors for booking data
 */
function validateBookingData(data: unknown): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  
  if (!data || typeof data !== 'object' || data === null) {
    errors.general = ['No data provided'];
    return errors;
  }
  
  const bookingData = data as Record<string, unknown>;
  
  // Contact details validation
  if (!bookingData.contactDetails || typeof bookingData.contactDetails !== 'object') {
    errors['contactDetails'] = ['Contact details are required'];
  } else {
    const contactDetails = bookingData.contactDetails as Record<string, unknown>;
    const contactErrors: string[] = [];
    
    if (!contactDetails.firstName) contactErrors.push('First name is required');
    if (!contactDetails.lastName) contactErrors.push('Last name is required');
    if (!contactDetails.email) contactErrors.push('Email is required');
    if (!contactDetails.phoneNumber) contactErrors.push('Phone number is required');
    
    if (contactErrors.length > 0) {
      errors['contactDetails'] = contactErrors;
    }
  }
  
  // Booking details validation
  if (!bookingData.bookingDetails || typeof bookingData.bookingDetails !== 'object') {
    errors['bookingDetails'] = ['Booking details are required'];
  } else {
    const bookingDetails = bookingData.bookingDetails as Record<string, unknown>;
    const bookingErrors: string[] = [];
    
    if (!bookingDetails.dates) bookingErrors.push('Dates are required');
    if (!bookingDetails.preferredHotel) bookingErrors.push('Preferred hotel is required');
    
    if (bookingErrors.length > 0) {
      errors['bookingDetails'] = bookingErrors;
    }
  }
  
  // Room requirements validation
  if (!bookingData.roomRequirements || typeof bookingData.roomRequirements !== 'object') {
    errors['roomRequirements'] = ['Room requirements are required'];
  } else {
    const roomRequirements = bookingData.roomRequirements as Record<string, unknown>;
    const roomErrors: string[] = [];
    
    if (!roomRequirements.rooms) roomErrors.push('Room information is required');
    
    if (roomRequirements.rooms && typeof roomRequirements.rooms === 'object') {
      const rooms = roomRequirements.rooms as Record<string, unknown>;
      const totalRooms = Object.values(rooms).reduce((sum: number, count) => {
        return sum + (typeof count === 'number' ? count : 0);
      }, 0);
      
      if (totalRooms <= 0) {
        roomErrors.push('At least one room must be selected');
      }
    }
    
    if (roomErrors.length > 0) {
      errors['roomRequirements'] = roomErrors;
    }
  }
  
  // Terms validation
  const enquiryData = data as Record<string, unknown>;
  if (typeof enquiryData.termsAccepted !== 'boolean' || !enquiryData.termsAccepted) {
    errors['terms'] = ['You must accept the terms and conditions'];
  }
  
  return errors;
}
