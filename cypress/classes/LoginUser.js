export default class LoginUser {

    // private class attributes
    #email
    #input_email
    #password
    #input_password
    #button
    #button_text
    #title_login
    #title_loggedin

    // initialize values in constructor
    constructor(params){
        this.#email = params.username
        this.#input_email = params.input_email
        this.#password = params.password
        this.#input_password = params.input_password
        this.#button = params.button
        this.#button_text = params.button_text
        this.#title_login = params.title_login
        this.#title_loggedin = params.title_loggedin
    }

    // public
    // performs login
    login(){
        this.#enterEmail()
        this.#enterPassword()
        this.#checkRememberMe()
        this.#clickLoginButton()
    }

    // public
    // validate login screen title
    checkLoginTitle(){
        cy.title().should('contain', this.#title_login)
    }

    // public
    // validate dashboard has loaded
    checkDashboardTitle(){
        cy.title().should('eq', this.#title_loggedin)
    }

    // public
    // validate button text
    checkButtonText(){
        cy.verifyElementText({
            selector: this.#button,
            text: this.#button_text
        })
    }

    // private
    // type in email in given selector
    #enterEmail(){
        cy.get(this.#input_email)
            .should('exist')
            .clear()
            .type(this.#email)
    }

    // private
    // type in password in given selector
    #enterPassword(){
        cy.get(this.#input_password)
            .should('exist')
            .clear()
            .type(this.#password)
    }

    // private
    // Validates then clicks button
    #clickLoginButton(){
        cy.get(this.#button)
            .should('exist')
            .click()
    }
}