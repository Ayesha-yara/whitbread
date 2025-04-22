describe('Room Requirements Section', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/en/why/groups/form');

    cy.contains('Rooms').click();
  });

  it('should display the Room Requirements section', () => {
    cy.contains('Rooms').should('be.visible');
    cy.contains('Select the maximum number of rooms required by room type and occupancy.').should('be.visible');

    cy.contains('See room types').should('be.visible');
  });

  it('should allow selecting room quantities', () => {
    cy.get('button[aria-label="Increase Single Occupancy"]').click();
    cy.get('input[id="singleRooms"]').should('have.value', '1');

    cy.get('button[aria-label="Increase Double Occupancy"]').click().click();
    cy.get('input[id="doubleRooms"]').should('have.value', '2');

    cy.get('button[aria-label="Increase Twin"]').click();
    cy.get('input[id="twinRooms"]').should('have.value', '1');

    cy.contains('Total: 4 rooms').should('be.visible');
  });

  it('should allow decreasing room quantities', () => {
    cy.get('button[aria-label="Increase Single Occupancy"]').click();
    cy.get('button[aria-label="Decrease Single Occupancy"]').click();
    cy.get('input[id="singleRooms"]').should('have.value', '0');

    cy.get('button[aria-label="Increase Double Occupancy"]').click().click();
    cy.get('button[aria-label="Decrease Double Occupancy"]').click();
    cy.get('input[id="doubleRooms"]').should('have.value', '1');
  });

  it('should allow checking additional options', () => {
    cy.get('input[name="roomRequirements.isTravellingWithChild"]').check();
    cy.get('input[name="roomRequirements.isTravellingWithChild"]').should('be.checked');

    cy.get('input[name="roomRequirements.isAccessibleRoom"]').check();
    cy.get('input[name="roomRequirements.isAccessibleRoom"]').should('be.checked');
  });

  it('should allow entering additional information', () => {
    cy.get('textarea[name="additionalInformation.comments"]').type(
      'We need 2 rooms on the first night and 3 rooms on the second night.'
    );

    cy.get('textarea[name="additionalInformation.comments"]').should(
      'have.value',
      'We need 2 rooms on the first night and 3 rooms on the second night.'
    );
  });

  it('should dynamically update the total room count', () => {
    cy.get('button[aria-label="Increase Single Occupancy"]').click();
    cy.get('button[aria-label="Increase Double Occupancy"]').click().click();
    cy.get('button[aria-label="Increase Twin"]').click();

    cy.contains('Total: 4 rooms').should('be.visible');

    cy.get('button[aria-label="Decrease Double Occupancy"]').click();
    cy.contains('Total: 3 rooms').should('be.visible');
  });

});