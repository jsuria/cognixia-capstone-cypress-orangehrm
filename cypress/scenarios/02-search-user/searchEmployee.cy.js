/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('search employee',() => {

    // login
    before(()=>{
        cy.fixture('loginAdmin').then((response)=> {
            cy.LoginToWeb(response)
        })
    })

    // logout
    after(()=>{
        cy.fixture('loginAdmin').then((response)=> {
            cy.Logout(response)
        })
    })

    it('verify dashboard, search user and upload photos/attachments', ()=> {
        cy.fixture('searchUser').then((params)=> {
            cy.TestSearchUser(params)
        })
    })
})