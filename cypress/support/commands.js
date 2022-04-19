// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('input[id="firstName"]')
        .type('Joãozinho')

    cy.get('input[id="lastName"]')
        .type('trinta')

    cy.get('input[id="email"]')
        .type('joaozinho30@teste.com')

    cy.get('textarea[id="open-text-area"]')
        .type('Teste Cypress Commands', { delay: 0 })

    cy.contains('button', 'Enviar')
        .click('center')

    cy.get('.success')
        .should('be.visible')

})