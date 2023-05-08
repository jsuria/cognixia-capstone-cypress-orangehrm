
describe('login as new employee system user',() => {

    // login
    before(()=>{
        // set the browser window size
        cy.viewport(1920, 1080)

        cy.visit('http://localhost/apps/orangehrm/web/index.php/auth/login')

        // username
        cy.get('input[name="username"]').should('be.visible').type('alexandrus.maximus')

        // password
        cy.get('input[name="password"]').should('be.visible').type('A13x#4321!')

        // Click button
        cy.xpath('//button[@type="submit"]').should('be.visible')
                                          .click()

        // Dashboard has loaded on login
        cy.url().should('contain', '/dashboard/index')

        // Sidepanel has loaded
        cy.xpath('//div[@class="oxd-sidepanel-body"]/descendant::ul')
            .should('be.visible')

        cy.wait(2000)
    })

    
    it('personal details view info', ()=> {

        // Click My Info
        cy.visit('http://localhost/apps/orangehrm/web/index.php/pim/viewMyDetails')

         // will be redirected to profile details screen
         cy.url().should('contain', 'viewPersonalDetails')

        // Fields are visible and enabled
       // Details are visible
        cy.get('[name="firstName"]').should('be.visible')
                                    .should('have.value','Alexandrus')

        cy.get('[name="lastName"]').should('be.visible')
                                    .should('have.value','Maximus')

        // Nationality        
        cy.xpath('//label[contains(text(),"Nationality")]/parent::div/following-sibling::div/descendant::div[contains(text(),"American")]')
                .should('be.visible')
                
        // Gender
        cy.xpath('//input[@type="radio"][@value="1"]')
                .should('exist')
                .should('be.checked')

        // Should be non-editable
        // Employee ID, Drivers's License Number, and Date of Birth

        // Not required so it can be blank
        cy.xpath('//label[text()="Employee Id"]/parent::div/following-sibling::div/descendant::input')
                             .should('be.visible')
                             .should('be.disabled')
        // Birth date
        cy.xpath('//label[contains(text(),"Birth")]/parent::div/following-sibling::div/descendant::input')
                             .should('be.visible')
                             .should('be.disabled')
                             .should('have.value', '1982-09-24')

        // Testing for another disabled field
        // Drivers License, not required
        cy.xpath('//label[text()="Driver\'s License Number"]/parent::div/following-sibling::div/descendant::input')
                            .should('be.visible')
                            .should('be.disabled')

        // logout
        cy.visit('http://localhost/apps/orangehrm/web/index.php/auth/logout')
    })

    

})