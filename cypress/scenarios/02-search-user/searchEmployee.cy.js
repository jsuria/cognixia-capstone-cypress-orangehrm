
describe('search employee',() => {

    // login
    before(()=>{
        cy.visit('')

        // username
        cy.get('').should('be.visible').type('Admin')

        // password
        cy.get('').should('be.visible').type('Password')
    })

    it('go to form and search employee', ()=> {
        // Nav to PIM\Employee List
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

        // ensure match is found
        cy.get('column of search result').should('be.visible')
                                         .should('contain', 'Alexandrus')
        
        // ensure 1 match only
        cy.get('text containing num of results').should('contain','1')
        cy.xpath('//div[@class="oxd-table-card"]').then((resp)=> {
            expect(resp.length).to.eq(1)
        })

        // logout
        cy.visit('/logout')

    })

    

})