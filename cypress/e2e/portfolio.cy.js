describe('Portfolio App E2E (AI-assisted Cypress)', () => {
  it('loads the home page and shows portfolio branding', () => {
    cy.visit('/');
    cy.contains('MY PORTFOLIO').should('be.visible');
    cy.contains('WELCOME.EXE').should('be.visible');
    cy.contains('SIGN IN').should('be.visible');
    cy.contains('SIGN UP').should('be.visible');
  });

  it('navigates to About and Contact pages', () => {
    cy.visit('/');
    cy.contains('a', 'ABOUT').click();
    cy.url().should('include', '/about');
    cy.contains('a', 'CONTACT').click();
    cy.url().should('include', '/contact');
    cy.contains('CONTACT_ME.EXE').should('be.visible');
    cy.contains('SUBMIT MESSAGE').should('be.visible');
  });

  it('opens Sign In page and validates form fields', () => {
    cy.visit('/signin');
    cy.contains('Sign In').should('be.visible');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').contains('Sign In');
  });

  it('submits contact form successfully against local API', () => {
    cy.visit('/contact');
    cy.get('input[name="firstName"]').type('Cypress');
    cy.get('input[name="lastName"]').type('Tester');
    cy.get('input[name="number"]').type('5551234567');
    cy.get('input[name="email"]').type('cypress@test.com');
    cy.get('textarea[name="message"]').type('E2E contact form test');

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alert');
    });

    cy.get('button[type="submit"]').contains('SUBMIT MESSAGE').click();
    cy.get('@alert').should('have.been.called');
    cy.contains('Message submitted successfully!').should('be.visible');
  });
});
