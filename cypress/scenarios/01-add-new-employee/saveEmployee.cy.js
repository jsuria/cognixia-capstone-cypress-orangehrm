
describe('save new employee',() => {

    // login
    before(()=>{
        cy.visit('')

        // username
        cy.get('').should('be.visible').type('Admin')

        // password
        cy.get('').should('be.visible').type('Password')

    })

    it('go to form and add employee', ()=> {

        // Nav to PIM\Employee List
        cy.visit('')
        cy.url().should('contain', 'viewEmployeeList')

        // Add button is visible
        cy.get('').should('be.visible').click()

        // Add Employee form has loaded
        cy.get('').should('contain', 'Add Employee')

        // Fields are visible and enabled
        cy.get('first name').should('be.visible').type('Alexandrus')
        cy.get('last name').should('be.visible').type('Maximus')
        cy.get('employee id').should('be.visible')
                             .should('not.be.empty')
                             .should('not.be.NaN')

        // Enable the toggle to display the user form
        cy.get('create_login_toggle').should('be.visible')
                                     .check()
                                     .should('be.checked')
        // username
        cy.get('username field').should('be.visible')
                                .should('be.empty')
                                .type('alexandrus.maximus')
        // password
        cy.get('password field').should('be.visible')
                                .should('be.empty')
                                .type('Alex#12345')
        // confirm
        cy.get('confirm password field').should('be.visible')
                                .should('be.empty')
                                .type('Alex#12345')
        // enable user account
        cy.get('status checkbox enabled').should('be.visible')
                                         .check()
                                         .should('be.checked')
        // save
        cy.get('save button').should('be.visible')
                             .click()
    
        // will be redirected to profile details screen
        cy.url().should('contain', 'viewPersonalDetails')

        // Details are visible
        cy.get('first name field').should('be.visible')
                                  .should('not.be.empty')
                                  .contains('Alexandrus')
        cy.get('last name field').should('be.visible')
                                 .should('not.be.empty')
                                 .contains('Maximus')
    })

    it('go to System User List and search new user ', ()=> {

        // Nav to System User list
        cy.visit('/web/index.php/admin/viewSystemUsers')
        cy.url().should('contain', 'viewSystemUsers')

        cy.get('form title')
            .should('be.visible')
            .should('contain', 'System Users')

        // search for newly created user
        cy.get('search form field').should('be.visible')
                                   .type('alexandrus.maximus')
        cy.get('search button').should('be.visible')
                               .click()

        // ensure match is found
        cy.get('column of search result').should('be.visible')
                                         .should('contain', 'alexandrus.maximus')

        // ensure 1 match only
        cy.get('text containing num of results').should('contain','1')
        cy.xpath('//div[@class="oxd-table-card"]').then((resp)=> {
            expect(resp.length).to.eq(1)
        })

        // logout
        cy.visit('/logout')
    })


})