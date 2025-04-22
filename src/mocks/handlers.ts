import { http } from 'msw';

// Define the type for the request body
interface GroupBookingRequestBody {
  contactDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
  bookingDetails: {
    bookerType: string;
    purposeOfStay: string;
    reasonForVisit?: string;
    preferredHotel?: string;
    dates?: {
      checkIn: string;
      checkOut: string;
    };
  };
  roomRequirements: {
    rooms: Record<string, number>;
    isTravellingWithChild?: boolean;
    isAccessibleRoom?: boolean;
  };
}

export const handlers = [
  http.post('/api/submit-group-booking', (req, res, ctx) => {
    const {
      contactDetails,
      bookingDetails,
      roomRequirements,
    } = req.body as GroupBookingRequestBody;

    // Validate required fields
    if (
      !contactDetails?.firstName ||
      !contactDetails?.lastName ||
      !contactDetails?.email ||
      !contactDetails?.phoneNumber ||
      !bookingDetails?.bookerType ||
      !bookingDetails?.purposeOfStay ||
      !roomRequirements?.rooms
    ) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'All required fields must be filled.' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ message: 'Group booking form submitted successfully.' })
    );
  }),
];