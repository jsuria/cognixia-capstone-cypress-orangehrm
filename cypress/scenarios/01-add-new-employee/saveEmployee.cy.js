/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("add and update new employee",() => {

	// login
	before(() => {
		cy.fixture("loginAdmin").then((response) => {
			cy.LoginToWeb(response);
		});
	});

	// logout
	after(() => {
		cy.fixture("loginAdmin").then((response) => {
			cy.Logout(response);
		});
	});

	it("go to form and add employee", () => {
		cy.fixture("addNewEmployee").then((selectors) => {
			cy.TestAddNewEmployee(selectors);
		});
	});
});