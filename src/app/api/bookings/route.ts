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
function isValidBookingData(data: any): boolean {
  if (!data) return false;
  
  // Check if required sections exist
  if (!data.contactInformation || !data.bookingDetails || !data.roomRequirements) {
    return false;
  }
  
  // Check for required fields in contactInformation
  const { contactInformation } = data;
  if (!contactInformation.firstName || 
      !contactInformation.lastName || 
      !contactInformation.email || 
      !contactInformation.phoneNumber) {
    return false;
  }
  
  // Check for required fields in bookingDetails
  const { bookingDetails } = data;
  if (!bookingDetails.dateRange || !bookingDetails.location) {
    return false;
  }
  
  // Check for required fields in roomRequirements
  const { roomRequirements } = data;
  if (roomRequirements.numberOfRooms <= 0 || roomRequirements.numberOfGuests <= 0) {
    return false;
  }
  
  // Check if terms are accepted
  if (!data.termsAccepted) {
    return false;
  }
  
  return true;
}

/**
 * Returns validation errors for booking data
 */
function validateBookingData(data: any): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  
  if (!data) {
    errors.general = ['No data provided'];
    return errors;
  }
  
  // Contact information validation
  if (!data.contactInformation) {
    errors['contactInformation'] = ['Contact information is required'];
  } else {
    const { contactInformation } = data;
    const contactErrors: string[] = [];
    
    if (!contactInformation.firstName) contactErrors.push('First name is required');
    if (!contactInformation.lastName) contactErrors.push('Last name is required');
    if (!contactInformation.email) contactErrors.push('Email is required');
    if (!contactInformation.phoneNumber) contactErrors.push('Phone number is required');
    
    if (contactErrors.length > 0) {
      errors['contactInformation'] = contactErrors;
    }
  }
  
  // Booking details validation
  if (!data.bookingDetails) {
    errors['bookingDetails'] = ['Booking details are required'];
  } else {
    const { bookingDetails } = data;
    const bookingErrors: string[] = [];
    
    if (!bookingDetails.dateRange) bookingErrors.push('Date range is required');
    if (!bookingDetails.location) bookingErrors.push('Location is required');
    
    if (bookingErrors.length > 0) {
      errors['bookingDetails'] = bookingErrors;
    }
  }
  
  // Room requirements validation
  if (!data.roomRequirements) {
    errors['roomRequirements'] = ['Room requirements are required'];
  } else {
    const { roomRequirements } = data;
    const roomErrors: string[] = [];
    
    if (!roomRequirements.roomType) roomErrors.push('Room type is required');
    if (roomRequirements.numberOfRooms <= 0) roomErrors.push('Number of rooms must be greater than 0');
    if (roomRequirements.numberOfGuests <= 0) roomErrors.push('Number of guests must be greater than 0');
    
    if (roomErrors.length > 0) {
      errors['roomRequirements'] = roomErrors;
    }
  }
  
  // Terms validation
  if (!data.termsAccepted) {
    errors['terms'] = ['You must accept the terms and conditions'];
  }
  
  return errors;
}
