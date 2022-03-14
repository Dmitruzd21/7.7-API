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

Cypress.Commands.add('createUser', (id, userName, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
        method: "POST",
        url: "https://petstore.swagger.io/v2/user",
        body: {
         "id": id,
         "username": userName,
         "firstName": firstName,
         "lastName": lastName,
         "email": email,
         "password": password,
         "phone": phone,
         "userStatus": userStatus
        }
        }).then((response1) => {
            return cy.wrap(response1);
        });
});

Cypress.Commands.add('deleteUser', (userName) => {
   cy.request({
    method: "DELETE",
    url: `https://petstore.swagger.io/v2/user/${userName}`,
    failOnStatusCode: false
       }).then((response2) => {
          return cy.wrap(response2);
       });
});

Cypress.Commands.add('getUser', (userName) => {
    cy.request({
     method: "GET",
     url: `https://petstore.swagger.io/v2/user/${userName}`,
     failOnStatusCode: false
        }).then((response3) => {
           return cy.wrap(response3);
        });
 });

 Cypress.Commands.add('updateUser', (id, userName, firstName, lastName, email, password, phone, userStatus) => {
    cy.request({
     method: "PUT",
     url: `https://petstore.swagger.io/v2/user/${userName}`,
     body: {
        "id": id,
        "username": userName,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "phone": phone,
        "userStatus": userStatus
       }
        }).then((response4) => {
           return cy.wrap(response4);
        });
 });

