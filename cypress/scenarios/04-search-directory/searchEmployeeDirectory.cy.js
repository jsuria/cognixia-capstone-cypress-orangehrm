
describe('search employee',() => {

    // login
    before(()=>{
        cy.visit('')

        // username
        cy.get('').should('be.visible').type('Admin')

        // password
        cy.get('').should('be.visible').type('Password')
    })

    it('go to form and search directory', ()=> {
        // Nav to Directory
        cy.visit('')
        cy.url().should('contain', 'viewEmployeeList')

        // Search form has loaded
        cy.get('').should('contain', 'Employee Information')
        
        // Input into form
        cy.get('employee name field').should('be.visible')
                                  .should('be.empty')
                                  .type('Alexandrus Maximus')
        
        // Search button is visible
        cy.get('search button').should('be.visible').click()
        
        // ensure 1 match only
        cy.get('//div[@class="orangehrm-corporate-directory"]//descendant::span').should('contain','(1)')
        //
        cy.xpath('//div[@class="orangehrm-corporate-directory"]/descendant::p')
            .should()
            .then((resp)=> {
            expect(resp.length).to.eq(1)
        })

        // logout
        cy.visit('/logout')

    })

    

})