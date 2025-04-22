import {  } from 'msw';

export const handlers = [
  rest.post('/api/submit-group-booking', (req, res, ctx) => {
    const {
      contactDetails,
      bookingDetails,
      roomRequirements,
    } = req.body as Record<string, any>;

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