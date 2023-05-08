/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('add and update new employee',() => {

    // login
    before(()=>{
        cy.visit('http://localhost/apps/orangehrm/web/index.php/auth/login')

        // set the browser window size
        cy.viewport(1920, 1080)
        // username
        cy.get('input[name="username"]').should('be.visible')
                                        .type('Admin')

        // password
        cy.get('input[name="password"]').should('be.visible')
                                        .type('Js092482!')

        // Click button
        cy.xpath('//button[@type="submit"]').should('be.visible')
                                          .click()

    })

    it('go to form and add employee', ()=> {
        
        // Dashboard has loaded on login
        cy.url().should('contain', '/dashboard/index')

        // Nav to PIM\Employee List
        
        // Sidepanel has loaded
        cy.xpath('//div[@class="oxd-sidepanel-body"]/descendant::ul')
            .should('be.visible')

        // PIM link has loaded
        cy.xpath('//div[@class="oxd-sidepanel-body"]/descendant::a/child::span[text()="PIM"]')         
            .should('be.visible')

        // XHR issues when dashboard cards still loading
        // Need to delay for 2 seconds until dashboard items finish loading
        cy.wait(2000)

        cy.visit('http://localhost/apps/orangehrm/web/index.php/pim/viewPimModule')

        cy.url().should('contain', '/pim/viewEmployeeList')

        cy.xpath('//h5[text()="Employee Information"]')
            .should('be.visible')
        cy.wait(2000)

        cy.xpath('//button[@type="button"]/descendant::i[@class="oxd-icon bi-plus oxd-button-icon"]')
            .should('exist')
            .scrollIntoView()
            .click()
        
        // Add Employee form has loaded
        cy.xpath('//h6[text()="Add Employee"]').should('contain', 'Add Employee')

        // Fields are visible and enabled
        cy.get('[name="firstName"]').should('be.visible')
                                    .type('Alexandrus')
        cy.get('[name="lastName"]').should('be.visible')
                                   .type('Maximus')
        // Employee ID leave blank                           
        cy.xpath('//label[text()="Employee Id"]/parent::div/following-sibling::div/descendant::input')
                             .should('be.visible')
                             .clear()

        // Enable the toggle to display the user form
        cy.xpath('//p[text()="Create Login Details"]/following-sibling::div')
                            .should('exist')
                            .click()

        // username
        cy.xpath('//label[text()="Username"]/parent::div/following-sibling::div/descendant::input')
                            .should('be.visible')
                            .should('be.empty')
                            .type('alexandrus.maximus')
        // password
        cy.xpath('//label[text()="Password"]/parent::div/following-sibling::div/descendant::input')
                                .should('be.visible')
                                .should('be.empty')
                                .type('A13x#4321!')
        // confirm
        cy.xpath('//label[text()="Confirm Password"]/parent::div/following-sibling::div/descendant::input')
                                .should('be.visible')
                                .should('be.empty')
                                .type('A13x#4321!')

        // enable user account
        cy.xpath('//input[@type="radio"][@value="1"]')
                                .should('exist')
                                .check()
                                .should('be.checked')
        // save
        cy.xpath('//button[@type="submit"]')
                                .should('be.visible')
                                .should('contain', 'Save')
                                .click()

        cy.wait(2000)

        // will be redirected to profile details screen
        cy.url().should('contain', 'viewPersonalDetails')

        // Details are visible
        cy.get('[name="firstName"]').should('be.visible')
                                    .should('have.value','Alexandrus')

        cy.get('[name="lastName"]').should('be.visible')
                                    .should('have.value','Maximus')
        
        // Open the datepicker
        cy.xpath('//label[contains(text(),"Birth")]/parent::div/following-sibling::div/descendant::input')
                .should('be.visible')
                .click()

        // Set birthdate
        cy.xpath('//label[contains(text(),"Birth")]/parent::div/following-sibling::div/descendant::input')
                .should('be.visible')
                .type('1982-09-24')
        
        // Set nationality to American
        // Click on the custom dropdown
        cy.xpath('//label[contains(text(),"Nationality")]/parent::div/following-sibling::div/descendant::div[contains(text(),"Select")]')
                .should('be.visible')
                .click()

        // Access the open list, click on American
        cy.get('[role=listbox] [role=option]')
                .contains('American')
                .should('be.visible')
                .click()

        // Set gender to Male
        cy.xpath('//input[@type="radio"][@value="1"]')
                .should('exist')
                .click({ force:true })

         // save
         cy.xpath('//button[@type="submit"]')
                .should('be.visible')
                .should('contain', 'Save')
                .click()

        cy.wait(2000)
    })
})