# Whitbread Group Booking Form

This is a **Next.js** project for managing group booking enquiries. It includes a multi-step form for collecting contact details, booking details, and room requirements. The project uses **React Hook Form**, **Zod** for validation, and **Mock Service Worker (MSW)** for API mocking during development and testing.

---

## Getting Started

### Development Server

To start the development server, run:

```bash
npm run dev
```

Open [[http://localhost:3000](http://localhost:3000)]
([https://whitbread-o2kh.vercel.app/en/why/groups/form](https://whitbread-o2kh.vercel.app/en/why/groups/form)
)) with your browser to see the result.
https://whitbread-o2kh.vercel.app/de/why/groups/form

## **Project Structure**
**Key Directories and Files**
src/components/form: Contains the main form components:

GroupBookingForm.tsx: The main form component.
sections/ContactDetailsSection.tsx: Handles contact details input.
sections/BookingDetailsSection.tsx: Handles booking details input.
sections/RoomRequirementsSection.tsx: Handles room requirements input.
src/lib: Contains utility functions and API logic:

api.ts: Functions for interacting with the backend API.
mockData.ts: Mock data for development and testing.
src/app/api: API routes for handling form submissions:

bookings/route.ts: Handles GET and POST requests for bookings.
tests: Contains unit and integration tests:

_mocks_: Mock handlers for API testing using MSW.
groupbookingform.test.tsx: Tests for the GroupBookingForm component.
cypress/e2e: End-to-end tests for the form:

groupBookingForm.cy.ts: Tests the entire form workflow.
contactDetailsSection.cy.ts: Tests the contact details section.
bookingDetailsSection.cy.ts: Tests the booking details section.
roomRequirementsSection.cy.ts: Tests the room requirements section.

## **Features**
Multi-Step Form:

Collects contact details, booking details, and room requirements.
Validates input using Zod.
API Integration:

Submits form data to /api/bookings.
Mocked API responses for development and testing using MSW.

**Accessibility:**
Uses aria-* attributes for better screen reader support.
Includes data-cy attributes for Cypress testing.
Testing:

Unit tests with React Testing Library and Jest.
End-to-end tests with Cypress.

**Running Tests**
Unit Tests
Run unit tests using Jest:
npm run test

**End-to-End Tests**
Run Cypress tests:
npx cypress open
This will open the Cypress Test Runner. You can select the test files to run.

Mock API
This project uses Mock Service Worker (MSW) for API mocking during development and testing.

**Starting the Mock Server**
The mock server is automatically started in development mode. To manually start it, add the following to your index.tsx:
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./src/mocks/browser');
  worker.start();
}

## **Deployment**
To deploy the application, use the Vercel Platform:


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Page Speed Insights - Lighthouse

![image](https://github.com/user-attachments/assets/71d1a4b4-e768-4282-889e-b35625076575)
Mobile: ![image](https://github.com/user-attachments/assets/ba4f5058-bd78-4d1b-bf5f-f5341b23d3b5)



