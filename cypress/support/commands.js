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

/* import '../support/core/cmdAddNewEmployee'
import '../support/core/cmdChangeUserPassword'
import '../support/core/cmdGithubAPI'
import '../support/core/cmdLoginUser'
import '../support/core/cmdSearchDirectory'
import '../support/core/cmdSearchUser'
import '../support/core/cmdUpdateEmployeeProfile' */