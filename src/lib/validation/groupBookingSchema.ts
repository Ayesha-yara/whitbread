import { z } from 'zod';

const titleEnum = z.enum(
  ['Mr', 'Mrs', 'Ms', 'Miss', 'Mx', 'Master', 'Dr', 'Lord', 'Lady', 'Sir', 'Col', 'Prof', 'Rev'],
  {
    errorMap: () => ({ message: 'Please select a valid title' })
  }
);

const bookerTypeEnum = z.enum(
  [
    'personal',
    'business',
    'travel-management-company',
    'travel-agent/tour-operator'
  ],
  {
    errorMap: () => ({ message: 'Please select your booker type' })
  }
);

const purposeOfStayEnum = z.enum(
  ['business', 'leisure'],
  {
    errorMap: () => ({ message: 'Please select whether your stay is for business or leisure' })
  }
);

const reasonForVisitEnum = z.enum(
  [
    'association',
    'bus-tour',
    'business-meeting',
    'charity-event',
    'convention-conference',
    'government',
    'graduation-reunion',
    'layover',
    'leisure-tour',
    'military',
    'music-band',
    'other',
    'religious-church-event',
    'school-group',
    'sport-event',
    'sport-team-adult',
    'sport-team-youth',
    'stag-hen-party',
    'trade-fair',
    'wedding',
    'work-crew',
    'youth-group'
  ],
  {
    errorMap: () => ({ message: 'Please select a reason for your visit' })
  }
);

const packageTypeEnum = z.enum(
  ['breakfast', 'meal-deal'],
  {
    errorMap: () => ({ message: 'Please select a package type' })
  }
);

export const groupBookingSchema = z.object({
  contactDetails: z.object({
    title: titleEnum,
    firstName: z.string().min(1, 'Please enter your first name').max(30, 'First name cannot exceed 30 characters'),
    lastName: z.string().min(1, 'Please enter your last name').max(30, 'Last name cannot exceed 30 characters'),
    phoneNumber: z.string().min(1, 'Please enter your phone number')
      .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number'),
    email: z.string().min(1, 'Please enter your email address').email('Please enter a valid email address')
  }),
  
  bookingDetails: z.object({
    bookerType: bookerTypeEnum,
    purposeOfStay: purposeOfStayEnum,
    isSchoolOrYouth: z.boolean(),
    reasonForVisit: reasonForVisitEnum,
    preferredHotel: z.string().min(1, 'Please enter your preferred hotel'),
    dates: z.object({
      checkIn: z.string().min(1, 'Please select a check-in date'),
      checkOut: z.string().min(1, 'Please select a check-out date')
    }),
    packageType: packageTypeEnum
  }),
  
  roomRequirements: z.object({
    isTravellingWithChild: z.boolean(),
    isAccessibleRoom: z.boolean(),
    rooms: z.object({
      singleOccupancy: z.number().min(0, 'Room count cannot be negative'),
      doubleOccupancy: z.number().min(0, 'Room count cannot be negative'),
      twinRooms: z.number().min(0, 'Room count cannot be negative'),
      familyOf21A1C: z.number().min(0, 'Room count cannot be negative'),
      familyOf32A1C: z.number().min(0, 'Room count cannot be negative'),
      familyOf31A2C: z.number().min(0, 'Room count cannot be negative'),
      familyOf42A2C: z.number().min(0, 'Room count cannot be negative'),
      accessibleSingle: z.number().min(0, 'Room count cannot be negative'),
      accessibleDouble: z.number().min(0, 'Room count cannot be negative'),
      accessibleTwin: z.number().min(0, 'Room count cannot be negative')
    }).refine(
      (data) => {
        const total = Object.values(data).reduce((sum, count) => sum + count, 0);
        return total > 0;
      },
      {
        message: 'Please select at least one room for your booking'
      }
    )
  }),
  
  additionalInformation: z.object({
    comments: z.string().max(1000, 'Comments cannot exceed 1000 characters').optional()
  })
});

export type GroupBookingFormData = z.infer<typeof groupBookingSchema>;