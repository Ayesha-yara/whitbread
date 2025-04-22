import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/submit-group-booking', async ({ request }) => {
    const data = await request.json();
    const {
      contactDetails,
      bookingDetails,
      roomRequirements,
    } = data as {
      contactDetails?: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
      };
      bookingDetails?: {
        bookerType?: string;
        purposeOfStay?: string;
      };
      roomRequirements?: {
        rooms?: Record<string, number>;
      };
    };

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
      return new HttpResponse(
        JSON.stringify({
          success: false,
          message: 'Missing required fields',
        }),
        { status: 400 }
      );
    }

    return new HttpResponse(
      JSON.stringify({
        success: true,
        message: 'Group booking form submitted successfully.',
      }),
      { status: 200 }
    );
  }),
];