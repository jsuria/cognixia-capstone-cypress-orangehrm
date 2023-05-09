
describe('save new employee',() => {

    // login
    before(()=>{
        cy.visit('')

        // username
        cy.get('').should('be.visible').type('Admin')

        // password
        cy.get('').should('be.visible').type('Password')
    })

    it('show optional nickname field',()=> {
        // Nav to PIM \ Configuration
        cy.visit('')
        cy.url().should('contain', 'configurePim')

        // Settings page
        cy.get('').should('contain', 'Optional Fields')

        // Locate toggle and enable
        cy.get('enable optional fields toggle')
            .should('be.visible')
            .check()
            .should('be.checked')
        
        // Save successfully
        cy.get('save button').should('be.visible')
                             .click()
    })

    it('search employee and update info', ()=> {
        // Nav to PIM\Employee List
        cy.visit('')
        cy.url().should('contain', 'viewEmployeeList')

        // Search form has loaded
        cy.get('').should('contain', 'Employee Information')
        
        // Input into form
        cy.get('employee name field').should('be.visible')
                                     .should('not.empty')
                                     .contains('Alexandrus Maximus')
        
        // Search button is visible
        cy.get('search button').should('be.visible').click()

        // Ensure match is found
        cy.get('column of search result').should('be.visible')
                                         .should('contain', 'Alexandrus')
        
        // ensure 1 match only
        cy.get('text containing num of results').should('contain','1')
        cy.xpath('//div[@class="oxd-table-card"]').then((resp)=> {
            expect(resp.length).to.eq(1).click()
        })
    })

    it('personal details update info', ()=> {

         // will be redirected to profile details screen
         cy.url().should('contain', 'viewPersonalDetails')

        // Fields are visible and enabled
        cy.get('first name').should('be.visible').contains('Alexandrus')
        cy.get('last name').should('be.visible').contains('Maximus')
        cy.get('employee id').should('be.visible')
                             .should('not.be.empty')
                             .should('not.be.NaN')
        
        // Start updating
        cy.get('nickname field').should('be.visible')
                                .type('Lexipoo')
        // datepicker
        // click the trigger to  display the calendar
        cy.xpath('//label[contains(text(),"Birth")]/parent::div/following-sibling::div/descendant::input')
          .should('be.visible')
          .should('have.attr','yyyy-mm-dd')
          .click()

        // should be visible
        // cy.get('.oxd-date-input-calendar').should('be.visible')
        cy.get('.oxd-date-wrapper').shadow()
                                   .find('.oxd-date-input-calendar')
                                   .should('be.visible')
        
        // Save Personal Details button
        cy.get('save button').should('be.visible')
                             .click()

        // logout
        //cy.visit('/logout')
    })

    

})