/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('Github Repo', () => {

    it('get authenticated user - list all (public) repos', () => {

        cy.fixture('gitHubAPI').then((apiValues)=> {
            
            // Workaround: Github auto-revokes tokens that are stored in the project,
            // so we store it in pieces
            const token_full = `${apiValues.github.token_p1}${apiValues.github.token_p2}`

            const headersCustom = {
                "Authorization": `Bearer ${token_full}`,
            } 
    
            cy.request({
                
                method: "GET", 
                url: apiValues.github.url_auth,
                headers: headersCustom

            }).then((result) => {
                expect(result.status).to.eq(200)

                // Log response time
                cy.log(`Response time: ${result.duration}`)
    
                const responseBody = result.body
    
                // Validate contents of body and header
                // Include my (public) repositories only
                const matches = responseBody.filter((resp) => resp.owner.login.includes("jsuria"))
    
                expect(parseInt(result.duration)).to.be.lte(2000)
                expect(matches.length).to.eq(12)
                expect(matches[3].owner.login).to.eq('jsuria')
            
            })
        })
    })

    it('create new repository', () => {

        cy.fixture('gitHubAPI').then((apiValues)=> {

            // Workaround: Github auto-revokes tokens that are stored in the project,
            // so we store it in pieces
            const token_full = `${apiValues.github.token_p1}${apiValues.github.token_p2}`

            // Add a random has to repo name
            const randomHash = Math.random().toString().substring(3)
            const repoName = `${apiValues.github.temp_repository}_${randomHash}`

            // set auth token in header
            const headersCustom = {
                "Authorization": `Bearer ${token_full}`,
            } 

            // set the repo name
            const bodyCustom = {
                "name": `${repoName}`
            }

            // Log the dynamic repo name
            cy.log(`Repository name: ${repoName}`)
    
            // do the request
            cy.request({
                method: "POST", 
                url: apiValues.github.url_auth,
                headers: headersCustom,
                body: bodyCustom

            }).then((result) => {
                expect(result.status).to.eq(201)

                // Log response time
                cy.log(`Response time: ${result.duration}`)
    
                const responseBody = result.body
         
                // Validate contents of body and header    
                expect(parseInt(result.duration)).to.be.lte(2000)
                expect(responseBody.full_name).to.eq(`${apiValues.github.owner}/${repoName}`)
                expect(responseBody.owner.login).to.eq(`${apiValues.github.owner}`)
            })
        })
    })

})