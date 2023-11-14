export default class LoginSystemUser {

	// private class attributes
	#sidepanel;
	#inputfirstname;
	#inputlastname;
	#inputdatepicker;
	#selectnationality;
	#urlpersonaldetails;
	#inputlicense;
	#inputgender;
	#inputemployeeid;

	// initialize values in constructor
	constructor (params){
		this.#sidepanel = params.sidepanel;

		this.#inputfirstname = params.inputfirstname;
		this.#inputlastname = params.inputlastname;
		this.#inputdatepicker = params.inputdatepicker;
		this.#selectnationality = params.selectnationality;

		this.#urlpersonaldetails = params.urlpersonaldetails;
        
		this.#inputlicense = params.inputlicense;
		this.#inputgender = params.inputgender;
		this.#inputemployeeid = params.inputemployeeid;
	}

	verifyDashboardHasLoaded () {
		// Dashboard has loaded on login
		cy.url().should("contain", "/dashboard/index");
        
		// Sidepanel has loaded
		cy.xpath(this.#sidepanel).should("be.visible");

		cy.SetWaitTime(2000);

		return this;
	}

	loadPersonalDetails (){
		//Load My Info
		cy.visit(this.#urlpersonaldetails);

		// will be redirected to profile details screen
		cy.url().should("contain", "viewPersonalDetails");
        
		cy.get(this.#inputfirstname).should("be.visible")
			.should("have.value","Alexandrus");

		cy.get(this.#inputlastname).should("be.visible")
			.should("have.value","Maximus");
                 
		// Gender, should be male
		cy.xpath(this.#inputgender).should("exist")
			.should("be.checked");
        
		// Nationality is American
		cy.xpath(this.#selectnationality)
			.should("be.visible");

		return this;
	}

	verifyDisabledFields (){
		// Should be non-editable
		// Employee ID, Drivers's License Number, and Date of Birth

		// Not required so it can be blank
		cy.xpath(this.#inputemployeeid)
			.should("be.visible")
			.should("be.disabled");

		// Drivers License, not required
		cy.xpath(this.#inputlicense)
			.should("be.visible")
			.should("be.disabled");

		cy.xpath(this.#inputdatepicker)
			.should("be.visible")
			.should("have.value","1982-09-24");

		return this;
	}

    
}