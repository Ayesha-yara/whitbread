import './contactDetailsSection.cy';
import './bookingDetailsSection.cy';
import './roomRequirementsSection.cy';

describe('Group Booking Form', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/en/why/groups/form');
  });

  it('should display the form with all sections', () => {
    cy.contains('Request a group booking').should('be.visible');
    cy.contains('Contact Details').should('be.visible');
    cy.contains('Booking Details').should('be.visible');
    cy.contains('Rooms').should('be.visible');
  });

  it('should allow filling out all sections and submit the form successfully', () => {
    cy.get('[data-cy="contactDetails.firstName"]').type('John');
    cy.get('[data-cy="contactDetails.lastName"]').type('Doe');
    cy.get('[data-cy="contactDetails.email"]').type('john.doe@example.com');
    cy.get('[data-cy="contactDetails.phoneNumber"]').type('1234567890');

    cy.contains('Booking Details').click();
    cy.get('[data-cy="bookingDetails.bookerType-business"]').click();
    cy.get('[data-cy="bookingDetails.purposeOfStay-leisure"]').click();
    cy.get('[data-cy="bookingDetails.reasonForVisit"]').select('Wedding');
    cy.get('[data-cy="bookingDetails.preferredHotel"]').type('Premier Inn London');

    cy.contains('Rooms').click();
    cy.get('[data-cy="roomRequirements.increaseSingleOccupancy"]').click();
    cy.get('[data-cy="roomRequirements.increaseDoubleOccupancy"]').click().click();
    cy.get('[data-cy="roomRequirements.isTravellingWithChild"]').check();
    cy.get('[data-cy="roomRequirements.isAccessibleRoom"]').check();

    cy.get('[data-cy="submit-button"]').click();
    cy.contains(/Thank you for your enquiry/i).should('be.visible');  
});

  it('should display an error message if submission fails', () => {
    cy.intercept('POST', '/api/submit-enquiry', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    });

    cy.get('[data-cy="contactDetails.firstName"]').type('John');
    cy.get('[data-cy="contactDetails.lastName"]').type('Doe');
    cy.get('[data-cy="contactDetails.email"]').type('john.doe@example.com');
    cy.get('[data-cy="contactDetails.phoneNumber"]').type('1234567890');

    cy.contains('Booking Details').click();
    cy.get('[data-cy="bookingDetails.bookerType-business"]').click();
    cy.get('[data-cy="bookingDetails.purposeOfStay-leisure"]').click();
    cy.get('[data-cy="bookingDetails.reasonForVisit"]').select('Wedding');

    cy.contains('Rooms').click();
    cy.get('[data-cy="roomRequirements.increaseSingleOccupancy"]').click();
    cy.get('[data-cy="roomRequirements.increaseDoubleOccupancy"]').click().click();
    cy.get('[data-cy="roomRequirements.isTravellingWithChild"]').check();
    cy.get('[data-cy="roomRequirements.isAccessibleRoom"]').check();

    cy.get('[data-cy="submit-button"]').click();
    cy.contains('Something went wrong. Please try again.').should('be.visible');
  });
});