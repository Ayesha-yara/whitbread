import { z } from 'zod';

const titleEnum = z.enum([
  'Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Master', 'Dr', 'Lord', 'Lady', 'Sir', 'Col', 'Prof', 'Rev'
]);

const bookerTypeEnum = z.enum([
  'Personal',
  'Business',
  'Travel-Management-Company',
  'Travel-Agent/Tour-Operator'
]);

const purposeOfStayEnum = z.enum(['Business', 'Leisure']);

const reasonForVisitEnum = z.enum([
  'Association',
  'Bus tour',
  'Business meeting',
  'Charity event',
  'Convention/Conference',
  'Government',
  'Graduation/Reunion',
  'Layover',
  'Leisure tour',
  'Military',
  'Music band',
  'Other',
  'Religious/Church event',
  'School group',
  'Sport event',
  'Sport team - Adult',
  'Sport team - Youth',
  'Stag/Hen party',
  'Trade fair',
  'Wedding',
  'Work crew',
  'Youth group'
]);

const packageTypeEnum = z.enum(['BREAKFAST', 'MEALDEAL']);

export const groupBookingSchema = z.object({
  contactDetails: z.object({
    title: titleEnum,
    firstName: z.string().min(1, 'First name is required').max(30),
    lastName: z.string().min(1, 'Last name is required').max(30),
    phoneNumber: z.string().min(1, 'Phone number is required')
      .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
    email: z.string().min(1, 'Email is required').email('Invalid email format')
  }),
  
  bookingDetails: z.object({
    bookerType: bookerTypeEnum,
    purposeOfStay: purposeOfStayEnum,
    isSchoolOrYouth: z.boolean(),
    reasonForVisit: reasonForVisitEnum,
    preferredHotel: z.string().min(1, 'Hotel preference is required'),
    dates: z.object({
      checkIn: z.string().min(1, 'Check-in date is required'),
      checkOut: z.string().min(1, 'Check-out date is required')
    }),
    packageType: packageTypeEnum
  }),
  
  roomRequirements: z.object({
    isTravellingWithChild: z.boolean(),
    isAccessibleRoom: z.boolean(),
    rooms: z.object({
      singleOccupancy: z.number().min(0),
      doubleOccupancy: z.number().min(0),
      twinRooms: z.number().min(0),
      familyOf21A1C: z.number().min(0),
      familyOf32A1C: z.number().min(0),
      familyOf31A2C: z.number().min(0),
      familyOf42A2C: z.number().min(0),
      accessibleSingle: z.number().min(0),
      accessibleDouble: z.number().min(0),
      accessibleTwin: z.number().min(0)
    }).refine(
      (data) => {
        const total = Object.values(data).reduce((sum, count) => sum + count, 0);
        return total > 0;
      },
      {
        message: 'At least one room must be selected'
      }
    )
  }),
  
  additionalInformation: z.object({
    comments: z.string().max(1000).optional()
  })
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;