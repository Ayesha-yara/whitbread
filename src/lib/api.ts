import { GroupBookingFormData } from '@/types/form';

/**
 * API response type for successful responses
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  referenceNumber?: string;
}

/**
 * API response type for error responses
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Combined API response type
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Fetch all booking submissions
 */
export async function fetchBookings(): Promise<ApiResponse<GroupBookingFormData[]>> {
  try {
    const response = await fetch('/api/bookings');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return {
      success: false,
      message: 'Failed to fetch bookings. Please try again later.'
    };
  }
}

/**
 * Submit a new booking
 */
export async function submitBooking(data: GroupBookingFormData): Promise<ApiResponse<GroupBookingFormData>> {
  try {
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting booking:', error);
    return {
      success: false,
      message: 'Failed to submit booking. Please try again later.'
    };
  }
}

/**
 * Fetch all available locations
 */
export async function fetchLocations(): Promise<ApiResponse<{ id: string; name: string }[]>> {
  try {
    const response = await fetch('/api/locations');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    return {
      success: false,
      message: 'Failed to fetch locations. Please try again later.'
    };
  }
}
