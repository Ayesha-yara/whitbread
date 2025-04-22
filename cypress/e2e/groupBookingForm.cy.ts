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
    cy.get('select[name="contactDetails.title"]').select('Mr');
    cy.get('input[name="contactDetails.firstName"]').type('John');
    cy.get('input[name="contactDetails.lastName"]').type('Doe');
    cy.get('input[name="contactDetails.email"]').type('john.doe@example.com');
    cy.get('input[name="contactDetails.phoneNumber"]').type('1234567890');


    cy.contains('Booking Details').click();
    cy.get('input[name="bookingDetails.bookerType"][value="business"]').check();
    cy.get('input[name="bookingDetails.purposeOfStay"][value="leisure"]').check();
    cy.get('select[name="bookingDetails.reasonForVisit"]').select('Wedding');
    cy.get('input[name="bookingDetails.preferredHotel"]').type('Premier Inn London');
    cy.get('input[name="bookingDetails.dates"]').click();
    cy.get('button.rdrDayToday').click({ force: true });
    cy.get('button.rdrDayEndOfWeek').last().click({ force: true });
    cy.contains('Apply').click({ force: true });
    cy.get('input[name="bookingDetails.packageType"][value="meal-deal"]').check();


    cy.contains('Rooms').click();
    cy.get('button[aria-label="Increase Single Occupancy"]').click();
    cy.get('button[aria-label="Increase Double Occupancy"]').click().click();
    cy.get('button[aria-label="Increase Twin"]').click();

    cy.contains('Total: 4 rooms').should('be.visible');
    cy.get('input[name="roomRequirements.isTravellingWithChild"]').check();
    cy.get('input[name="roomRequirements.isAccessibleRoom"]').check();
    cy.get('textarea[name="additionalInformation.comments"]').type(
      'We need 2 rooms on the first night and 3 rooms on the second night.'
    );
    cy.get('[data-cy="submit-button"]').last().click();
    cy.contains(/Thank you for your enquiry/i).should('be.visible');  
});

  it.only('should display an error message if submission fails', () => {
    cy.intercept('POST', '/api/bookings', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('submitEnquiryError');

    cy.get('select[name="contactDetails.title"]').select('Mr');
    cy.get('input[name="contactDetails.firstName"]').type('John');
    cy.get('input[name="contactDetails.lastName"]').type('Doe');
    cy.get('input[name="contactDetails.email"]').type('john.doe@example.com');
    cy.get('input[name="contactDetails.phoneNumber"]').type('1234567890');

    cy.contains('Booking Details').click();
    cy.get('input[name="bookingDetails.bookerType"][value="business"]').check();
    cy.get('input[name="bookingDetails.purposeOfStay"][value="leisure"]').check();
    cy.get('select[name="bookingDetails.reasonForVisit"]').select('Wedding');
    cy.get('input[name="bookingDetails.preferredHotel"]').type('Premier Inn London');
    cy.get('input[name="bookingDetails.dates"]').click();
    cy.get('button.rdrDayToday').click({ force: true });
    cy.get('button.rdrDayEndOfWeek').last().click({ force: true });
    cy.contains('Apply').click({ force: true });


    cy.contains('Rooms').click();
    cy.get('button[aria-label="Increase Single Occupancy"]').click();
    cy.get('button[aria-label="Increase Double Occupancy"]').click().click();
    cy.get('button[aria-label="Increase Twin"]').click();

    cy.contains('Total: 4 rooms').should('be.visible');
    cy.get('input[name="roomRequirements.isTravellingWithChild"]').check();
    cy.get('input[name="roomRequirements.isAccessibleRoom"]').check();
    cy.get('textarea[name="additionalInformation.comments"]').type(
      'We need 2 rooms on the first night and 3 rooms on the second night.'
    );

    cy.get('[data-cy="submit-button"]').last().click();
    cy.wait('@submitEnquiryError');
    cy.contains(/Internal Server Error/i).should('be.visible');
  });
});