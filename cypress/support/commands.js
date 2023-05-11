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

require('cypress-xpath')
require('cypress-iframe')
require('cypress-file-upload')

import AddNewEmployee from '../classes/AddNewEmployee'
import LoginSystemUser from '../classes/LoginSystermUser'
import SearchUser from '../classes/SearchUser'

Cypress.Commands.add('SetWaitTime', (msTime) => { 
    cy.wait(msTime)
})

Cypress.Commands.add('Logout', (params) => { 
    // logout
    cy.visit(params.logout)
})

Cypress.Commands.add('LoginToWeb', (params) => { 
    //cy.wait(msTime)

    cy.visit(params.url)

    // set the browser window size
    cy.viewport(params.viewport.width, params.viewport.height)

    // username
    cy.get(params.inputusername).should('be.visible')
                                .type(params.username)

    // password
    cy.get(params.inputpassword).should('be.visible')
                                .type(params.password)

    // Click button
    cy.xpath(params.buttonlogin).should('be.visible')
                                      .click()
})

Cypress.Commands.add('TestAddNewEmployee', (params) => {
    const addNewEmployee = new AddNewEmployee(params)

    addNewEmployee.verifyDashboardHasLoaded()
                .verifyAddEmployeeFormHasLoaded()
                .inputAddEmployeeForm()
                .inputUserCredentials()
                .verifyPersonalDetailsHasLoaded()
                .inputUpdateEmployeeForm()
})


Cypress.Commands.add('TestSearchUser', (params) => {
    const searchUser = new SearchUser(params)

    searchUser.verifyDashboardHasLoaded()
              .inputSearchForm()
              .loadPersonalDetails()
              .upload()
})

Cypress.Commands.add('TestLoginSystemUser', (params) => {
    const loginSystemUser = new LoginSystemUser(params)

    loginSystemUser.verifyDashboardHasLoaded()
                   .loadPersonalDetails()
                   .verifyDisabledFields()
})