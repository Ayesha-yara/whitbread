/**
 * Type definitions for the Booking Form
 */
import { ReactNode } from 'react';

export type Title = 
  | 'Mr'
  | 'Mrs'
  | 'Ms'
  | 'Miss'
  | 'Mx'
  | 'Master'
  | 'Dr'
  | 'Lord'
  | 'Lady'
  | 'Sir'
  | 'Col'
  | 'Prof'
  | 'Rev';

export type BookerType = 
  | 'personal'
  | 'business'
  | 'travel-management-company'
  | 'travel-agent/tour-operator';

export type PurposeOfStay = 'business' | 'leisure';

export type ReasonForVisit = 
  | 'association'
  | 'bus-tour'
  | 'business-meeting'
  | 'charity-event'
  | 'convention-conference'
  | 'government'
  | 'graduation-reunion'
  | 'layover'
  | 'leisure-tour'
  | 'military'
  | 'music-band'
  | 'other'
  | 'religious-church-event'
  | 'school-group'
  | 'sport-event'
  | 'sport-team-adult'
  | 'sport-team-youth'
  | 'stag-hen-party'
  | 'trade-fair'
  | 'wedding'
  | 'work-crew'
  | 'youth-group';

export type PackageType = 'breakfast' | 'meal-deal';

export interface ContactDetails {
  title: Title;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface DateRange {
  checkIn: string;
  checkOut: string;
}

export interface RoomCounts {
  singleOccupancy: number;
  doubleOccupancy: number;
  twinRooms: number;
  familyOf21A1C: number;
  familyOf32A1C: number;
  familyOf31A2C: number;
  familyOf42A2C: number;
  accessibleSingle: number;
  accessibleDouble: number;
  accessibleTwin: number;
}

export interface BookingDetails {
  bookerType: BookerType;
  purposeOfStay: PurposeOfStay;
  isSchoolOrYouth: boolean;
  reasonForVisit: ReasonForVisit;
  preferredHotel: string;
  dates: DateRange;
  packageType: PackageType;
}

export interface RoomRequirements {
  isTravellingWithChild: boolean;
  isAccessibleRoom: boolean;
  rooms: RoomCounts;
}

export interface AdditionalInformation {
  comments?: string;
}

export interface GroupBookingFormData {
  contactDetails: ContactDetails;
  bookingDetails: BookingDetails;
  roomRequirements: RoomRequirements;
  additionalInformation: AdditionalInformation;
  [key: string]: unknown; // Allow for dynamic fields
}

export type FieldValues = Record<string, unknown>;

export type SubmitHandler<T> = (data: T) => void | Promise<void>;

export interface FormSubmissionResponse {
  success: boolean;
  message: string;
  referenceNumber?: string;
  errors?: Record<string, string | string[]>;
}

export interface FormStep {
  id: string;
  title: string;
  component: ReactNode;
}

export type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
}[keyof ObjectType & (string | number)];

export type FormFieldPath = NestedKeyOf<GroupBookingFormData>;