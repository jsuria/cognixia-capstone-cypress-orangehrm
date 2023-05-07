export default class GitHubAPI {

    // private class attributes
    #url_auth
    #token
    #temp_repository
    #header_custom
    #body_custom

    // initialize values on instantiate
    constructor(params){
        this.#url_public = params.url_public
        this.#url_auth = params.url_auth
        this.#token = params.token
        this.#owner = params.owner
        this.#temp_repository = params.temp_repository
        this.#header_custom = {}
    }

    // private methods
    #setAuthorizationHeader(){
        this.#header_custom.Authorization = `Bearer ${this.#token}`
    }

    #setRepositoryName(property_value){
        this.#body_custom.name = property_value
    }

    // public methods 
    
    // additional custom headers
    setCustomHeader(custom_property, property_value){
        this.#header_custom[`${custom_property}`] = property_value
    }

    // additional custom body
    setCustomBody(custom_property, property_value){
        this.#body_custom[`${custom_property}`] = property_value
    }

    listRepositories(){
        this.#setAuthorizationHeader()

        return cy.request({
            method: "GET",
            url: this.#url_auth,
            headers: this.#header_custom
        })
    }

    createRepository(){
        this.#setRepositoryName(this.#temp_repository)
        this.#setAuthorizationHeader()

        return cy.request({
            method: "POST",
            url: this.#url_auth,
            headers: this.#header_custom
        })
    }

}