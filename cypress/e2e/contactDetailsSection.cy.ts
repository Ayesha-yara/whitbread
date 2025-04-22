describe('Contact Details Section', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/en/why/groups/form');
  });

  it('should display the Contact Details section', () => {
    cy.contains('Title').should('be.visible');
    cy.contains('First name').should('be.visible');
    cy.contains('Last name').should('be.visible');
    cy.contains('Email address').should('be.visible');
    cy.contains('Phone number').should('be.visible');
  });

  it('should allow selecting a title', () => {
    cy.get('select[name="contactDetails.title"]').select('Mr');
    cy.get('select[name="contactDetails.title"]').should('have.value', 'Mr');
  });

  it('should allow entering a first name', () => {
    cy.get('input[name="contactDetails.firstName"]').type('John');
    cy.get('input[name="contactDetails.firstName"]').should('have.value', 'John');
  });

  it('should allow entering a last name', () => {
    cy.get('input[name="contactDetails.lastName"]').type('Doe');
    cy.get('input[name="contactDetails.lastName"]').should('have.value', 'Doe');
  });

  it('should allow entering an email address', () => {
    cy.get('input[name="contactDetails.email"]').type('john.doe@example.com');
    cy.get('input[name="contactDetails.email"]').should('have.value', 'john.doe@example.com');
  });

  it('should allow entering a phone number', () => {
    cy.get('input[name="contactDetails.phoneNumber"]').type('1234567890');
    cy.get('input[name="contactDetails.phoneNumber"]').should('have.value', '1234567890');
  });
});