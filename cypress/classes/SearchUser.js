export default class SearchUser {
    // private class attributes
    #first_name
    #last_name 
    #input_email
    #input_value
    #button
    #xpath
    #button_text
    #match_result

    // initialize values in constructor
    constructor(params){
        this.#input_email = params.input_email
        this.#input_value = params.input_value
        this.#match_result = params.match_result
        this.#button = params.button
        this.#button_text = params.button_text
        this.#xpath = params.xpath
        this.#first_name = params.first_name ?? ""
        this.#last_name = params.last_name ?? ""
    }

    // public
    // search method that calls internal methods
    search(){
        this.#enterSearchEmail()
        this.#clickSearchButton()
        this.#checkMatchResult()
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
    // enters email into specified field
    #enterSearchEmail(){
        const ie = this.#xpath ? cy.xpath(this.#input_email) : cy.get(this.#input_email)
        ie.should('exist')
          .clear()
          .type(this.#input_value)
    }

    // private
    // clicks search button
    #clickSearchButton(){
        const bt = this.#xpath ? cy.xpath(this.#button) : cy.get(this.#button)
        bt.should('exist')
          .click()
    }

    // private
    // verifies search result matches to one given
    #checkMatchResult(){
        const mr = this.#xpath ? cy.xpath(this.#match_result) : cy.get(this.#match_result)
        mr.should('be.visible')
          .contains(this.#input_value)
    }
}