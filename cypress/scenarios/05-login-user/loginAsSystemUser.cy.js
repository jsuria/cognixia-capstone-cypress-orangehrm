
describe('login as new employee system user',() => {

    // login
    before(()=>{
        cy.visit('')

        // username
        cy.get('username field').should('be.visible').type('Admin')

        // password
        cy.get('password field').should('be.visible').type('Password')

        // get button
        cy.get('login button').should('be.visible')
                              .click()
    })

    
    it('personal details view info', ()=> {

        // Click My Info
        cy.visit('http://localhost/apps/orangehrm/web/index.php/pim/viewMyDetails')

         // will be redirected to profile details screen
         cy.url().should('contain', 'viewPersonalDetails')

        // Fields are visible and enabled
        cy.get('first name').should('be.visible').contains('Alexandrus')
        cy.get('last name').should('be.visible').contains('Maximus')

        // Nationality        
        cy.get('nationality').should('be.visible').contains('American')

        // Gender
        cy.get('gender radio male').should('be.visible')
                                   .should('be.checked')

        // Should be non-editable
        // Employee ID, Drivers's License Number, and Date of Birth
        cy.get('employee id').should('be.visible')
                             .should('not.be.empty')
                             .should('not.be.NaN')
                             .should('be.disabled')

        cy.get('date of birth').should('be.visible')
                             .should('not.be.empty')
                             .should('be.disabled')

        // Testing for another disabled field
        cy.get('drivers license').should('be.visible')
                                 .should('be.disabled')

        // logout
        //cy.visit('/logout')
    })

    

})