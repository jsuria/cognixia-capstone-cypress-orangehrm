describe('Github Repo', () => {

    it('get authenticated user - list all (public) repos', () => {

        cy.fixture('apiTestData').then((apiValues)=> {
            
            const headersCustom = {
                "Authorization": `Bearer ${apiValues.github.token}`,
            } 
    
            cy.request({
                
                method: "GET", 
                url: apiValues.github.url_auth,
                headers: headersCustom

            }).then((result) => {
                expect(result.status).to.eq(200)
    
                const responseBody = result.body
    
                // Validate contents of body and header
                // Include my (public) repositories only
                const matches = responseBody.filter((resp) => resp.owner.login.includes("jsuria"))
    
                expect(matches.length).to.eq(12)
                expect(matches[3].owner.login).to.eq('jsuria')
            
            })
        })
    })

    it('create new repository', () => {

        cy.fixture('apiTestData').then((apiValues)=> {
            
            const headersCustom = {
                "Authorization": `Bearer ${apiValues.github.token}`,
            } 

            const bodyCustom = {
                "name": `${apiValues.github.temp_repository}`
            }
    
            cy.request({
                
                method: "POST", 
                url: apiValues.github.url_auth,
                headers: headersCustom,
                body: bodyCustom

            }).then((result) => {
                expect(result.status).to.eq(201)
    
                const responseBody = result.body
    
                // Validate contents of body and header    
                expect(responseBody.full_name).to.eq(`${apiValues.github.owner}/${apiValues.github.temp_repository}`)
                expect(responseBody.owner.login).to.eq(`${apiValues.github.owner}`)
            
            })
        })
    })



})