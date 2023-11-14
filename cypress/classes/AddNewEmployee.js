export default class AddNewEmployee {
	// private class variables
	#sidepanel;
	#linkpim;
	#urlpim;
	#headeremployeeinfo;
	#buttonaddemployee;
	#headeraddemployee;
	#inputfirstname;
	#inputlastname;
	#inputemployeeid;
	#togglelogin;
	#inputusername;
	#inputpassword;
	#inputconfirm;
	#inputuserenable;
	#buttonsave;
	#inputdatepicker;
	#selectnationality;
	#optionnationality;
	#inputgendermale;

	// initialize values in constructor
	constructor (params){
		this.#sidepanel              = params.sidepanel;
		this.#linkpim                = params.linkpim;
		this.#urlpim                 = params.urlpim;
		this.#headeremployeeinfo     = params.headeremployeeinfo;
		this.#buttonaddemployee      = params.buttonaddemployee;
		this.#headeraddemployee      = params.headeraddemployee;
		this.#inputfirstname         = params.inputfirstname;
		this.#inputlastname          = params.inputlastname;
		this.#inputemployeeid        = params.inputemployeeid;
		this.#togglelogin            = params.togglelogin;
		this.#inputusername          = params.inputusername;
		this.#inputpassword          = params.inputpassword;
		this.#inputconfirm           = params.inputconfirm;
		this.#inputuserenable        = params.inputuserenable;
		this.#buttonsave             = params.buttonsave;
		this.#inputdatepicker        = params.inputdatepicker;
		this.#selectnationality      = params.selectnationality;
		this.#optionnationality      = params.optionnationality;
		this.#inputgendermale        = params.inputgendermale;      

	}

	verifyDashboardHasLoaded (){
		// Dashboard has loaded on login
		cy.url().should("contain", "/dashboard/index");

		// Nav to PIM\Employee List
        
		// Sidepanel has loaded
		cy.xpath(this.#sidepanel).should("be.visible");

		// PIM link has loaded
		cy.xpath(this.#linkpim).should("be.visible");

		// XHR issues when dashboard cards still loading
		// Need to delay for 2 seconds until dashboard items finish loading
		cy.wait(2000);

		cy.visit(this.#urlpim);

		cy.url().should("contain", "/pim/viewEmployeeList");

		cy.xpath(this.#headeremployeeinfo)
			.should("be.visible");

		cy.SetWaitTime(2000);

		return this;
	}

	myMethod () { 
		return "this is my methdd";
	}

	verifyAddEmployeeFormHasLoaded (){
		// Click to load the form
		cy.xpath(this.#buttonaddemployee)
			.should("exist")
			.scrollIntoView()
			.click();
        
		// Add Employee form has loaded
		cy.xpath(this.#headeraddemployee).should("contain", "Add Employee");

		return this;
	}

	verifyPersonalDetailsHasLoaded (){
		// will be redirected to profile details screen
		cy.url().should("contain", "viewPersonalDetails");
		return this;
	}

	inputAddEmployeeForm (){
		// Fields are visible and enabled
		cy.get(this.#inputfirstname).should("be.visible")
			.type("Alexandrus");
		cy.get(this.#inputlastname).should("be.visible")
			.type("Maximus");
                                   
		// Employee ID leave blank                           
		cy.xpath(this.#inputemployeeid)
			.should("be.visible")
			.clear();
		return this;
	}

	inputUserCredentials (){
		// Enable the toggle to display the user form
		cy.xpath(this.#togglelogin).should("exist")
			.click();

		// username
		cy.xpath(this.#inputusername)
			.should("be.visible")
			.should("be.empty")
			.type("alexandrus.maximus");
		// password
		cy.xpath(this.#inputpassword)
			.should("be.visible")
			.should("be.empty")
			.type("A13x#4321!");
		// confirm
		cy.xpath(this.#inputconfirm)
			.should("be.visible")
			.should("be.empty")
			.type("A13x#4321!");

		// enable user account
		cy.xpath(this.#inputuserenable)
			.should("exist")
			.check()
			.should("be.checked");
		// save
		cy.xpath(this.#buttonsave)
			.should("be.visible")
			.should("contain", "Save")
			.click();

		cy.SetWaitTime(2000);

		return this;
	}

	inputUpdateEmployeeForm (){
		// Details are visible
		cy.get(this.#inputfirstname).should("be.visible")
			.should("have.value","Alexandrus");

		cy.get(this.#inputlastname).should("be.visible")
			.should("have.value","Maximus");

		// Open the datepicker
		cy.xpath(this.#inputdatepicker)
			.should("be.visible")
			.click();

		// Set birthdate
		cy.xpath(this.#inputdatepicker)
			.should("be.visible")
			.type("1982-09-24");

		// Set nationality to American
		// Click on the custom dropdown
		cy.xpath(this.#selectnationality)
			.should("be.visible")
			.click();

		// Access the open list, click on American
		cy.get(this.#optionnationality)
			.contains("American")
			.should("be.visible")
			.click();

		// Set gender to Male
		cy.xpath(this.#inputgendermale)
			.should("exist")
			.click({ force:true });

		// save
		cy.xpath(this.#buttonsave).should("be.visible")
			.should("contain", "Save")
			.click();

		cy.SetWaitTime(2000);
	}
}