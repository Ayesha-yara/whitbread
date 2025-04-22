describe('LanguageSwitcher', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/en/why/groups/form');
  });

  it('should display the current language', () => {
    cy.get('button[aria-label="Select Language"]').contains('English');
  });

  it('should open the dropdown when clicked', () => {
    cy.get('button[aria-label="Select Language"]').click();

    cy.get('.absolute').should('be.visible');
  });

  it('should switch to German when Deutsch is clicked', () => {
    cy.get('button[aria-label="Select Language"]').click();

    cy.get('button[aria-label="Switch to German"]').click();

    cy.url().should('include', '/de/why/groups/form');

    cy.get('button[aria-label="Select Language"]').contains('Deutsch');
  });

  it('should switch to English when English is clicked', () => {
    cy.get('button[aria-label="Select Language"]').click();

    cy.get('button[aria-label="Switch to English"]').click();

    cy.url().should('include', '/en/why/groups/form');    

    cy.get('button[aria-label="Select Language"]').contains('English');    
  });

});