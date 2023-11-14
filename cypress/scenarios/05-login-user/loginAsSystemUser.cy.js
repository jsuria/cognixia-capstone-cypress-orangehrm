/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("login as new employee system user",() => {

	// login
	before(() => {
   
		cy.fixture("loginSystemUser").then((response) => {
			cy.LoginToWeb(response);
		});                           
	});

	// logout
	after(() => {
		cy.fixture("loginSystemUser").then((response) => {
			cy.Logout(response);
		});
	});
    
	it("personal details view info", () => {

		cy.fixture("loginSystemUser").then((response) => {
			cy.TestLoginSystemUser(response);
		});                           
	});

   
});