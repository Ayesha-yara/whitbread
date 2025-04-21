/**
 * Form types for the Premier Inn group booking application
 */

/**
 * Title/Salutation options for the contact form
 */
export type Salutation = 'Mr' | 'Mrs' | 'Ms' | 'Dr' | 'Prof' | 'Other';

/**
 * Country code for phone numbers
 */
export type CountryCode = '+44' | '+49' | string; // Add more as needed

/**
 * Contact information section of the form
 */
export interface ContactInformation {
  salutation: Salutation;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: CountryCode;
  email: string;
}

/**
 * Date range for the booking
 */
export interface DateRange {
  checkIn: Date;
  checkOut: Date;
}

/**
 * Room type options
 */
export type RoomType = 'Single' | 'Double' | 'Twin' | 'Family' | 'Accessible';

/**
 * Room requirements section
 */
export interface RoomRequirements {
  roomType: RoomType;
  numberOfRooms: number;
  numberOfGuests: number;
  specialRequirements?: string;
}

/**
 * Booking purpose options
 */
export type BookingPurpose = 'Business' | 'Leisure' | 'Wedding' | 'Conference' | 'Other';

/**
 * Booking details section
 */
export interface BookingDetails {
  dateRange: DateRange;
  location: string;
  purpose: BookingPurpose;
  additionalInformation?: string;
}

/**
 * Complete group booking form data
 */
export interface GroupBookingFormData {
  contactInformation: ContactInformation;
  bookingDetails: BookingDetails;
  roomRequirements: RoomRequirements;
  termsAccepted: boolean;
  marketingConsent?: boolean;
}

/**
 * Form submission status
 */
export type FormSubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

/**
 * API response for form submission
 */
export interface FormSubmissionResponse {
  success: boolean;
  referenceNumber?: string;
  message?: string;
  errors?: Record<string, string[]>;
}
