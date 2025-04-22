describe('Booking Details Section', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/en/why/groups/form');
    cy.contains('Booking Details').click();
  });

  it('should display the Booking Details section', () => {
    cy.contains('What type of booker are you?').should('be.visible');
    cy.contains('Is your group staying for Business or Leisure?').should('be.visible');
    cy.contains('What is the reason for your group\'s visit?').should('be.visible');
    cy.contains('Preferred hotel').should('be.visible');
    cy.contains('Arrival date').should('be.visible');
    cy.contains('Package type').should('be.visible');
  });

  it('should allow selecting a booker type', () => {
    cy.get('input[name="bookingDetails.bookerType"][value="business"]').click();
    cy.get('input[name="bookingDetails.bookerType"][value="business"]').should('be.checked');
  });

  it('should allow selecting a purpose of stay', () => {
    cy.get('input[name="bookingDetails.purposeOfStay"][value="leisure"]').click();
    cy.get('input[name="bookingDetails.purposeOfStay"][value="leisure"]').should('be.checked');
  });

  it('should allow checking the school or youth group checkbox', () => {
    cy.get('input[name="bookingDetails.isSchoolOrYouth"]').check();
    cy.get('input[name="bookingDetails.isSchoolOrYouth"]').should('be.checked');
  });

  it('should allow selecting a reason for visit', () => {
    cy.get('select[name="bookingDetails.reasonForVisit"]').select('Wedding');
    cy.get('select[name="bookingDetails.reasonForVisit"]').should('have.value', 'wedding');
  });

  it('should allow entering a preferred hotel', () => {
    cy.get('input[name="bookingDetails.preferredHotel"]').type('Premier Inn London');
    cy.get('input[name="bookingDetails.preferredHotel"]').should('have.value', 'Premier Inn London');
  });

  it('should allow selecting a package type', () => {
    cy.get('input[name="packageType"][value="meal-deal"]').click();
    cy.get('input[name="packageType"][value="meal-deal"]').should('be.checked');
  });

});