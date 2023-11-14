describe("Update password",() => {
	it("go to System User List and search systemuser ", () => {

		// Nav to System User list
		cy.visit("/web/index.php/admin/viewSystemUsers");
		cy.url().should("contain", "viewSystemUsers");

		cy.get("form title")
			.should("be.visible")
			.should("contain", "System Users");

		// search for newly created user
		cy.get("search form field").should("be.visible")
			.type("alexandrus.maximus");
		cy.get("search button").should("be.visible")
			.click();

		// ensure match is found
		cy.get("column of search result").should("be.visible")
			.should("contain", "alexandrus.maximus");

		// ensure 1 match only
		cy.get("text containing num of results").should("contain","1");
		cy.xpath("//div[@class=\"oxd-table-card\"]").then((resp) => {
			expect(resp.length).to.eq(1);
		});

		// Click result
		cy.xpath("//i[@class=\"oxd-icon bi-pencil-fill\"]")
			.should("be.visible")
			.click();


		// logout
		//cy.visit('/logout')
	});

	it("Update system user password", () => {
		// Ensure this is the edit form page
		cy.url().should("contain", "/admin/saveSystemUser/");
		cy.xpath("//h6[@class=\"oxd-text oxd-text--h6 orangehrm-main-title\"]")
			.should("be.visible")
			.should("contain", "Edit User");

		// Ensure username is there
		cy.get("username field").should("be.visible")
			.should("not.be.empty")
			.should("contain", "alexandrus.maximus");
        
		// Toggle the change password section
		cy.xpath("//span[@class=\"oxd-checkbox-input oxd-checkbox-input--active --label-right oxd-checkbox-input\"]/preceding-sibling::input")
			.should("be.visible")
			.check()
			.should("be.checked");

		// Ensure password fields are visible

		// Password
		cy.xpath("//div[@class=\"oxd-grid-item oxd-grid-item--gutters user-password-cell\"]/descendant::input")
			.should("be.visible")
			.should("be.empty")
			.type("Alex#12345");
            
		// Confirm password
		cy.xpath("//div[@class=\"oxd-grid-item oxd-grid-item--gutters user-password-cell\"]/following-sibling::div/descendant::input")
			.should("be.visible")
			.should("be.empty")
			.type("Alex#12345");

		// Click save button
		cy.get("button").should("be.visible")
			.should("not.be.disabled")
			.click();

	});

});