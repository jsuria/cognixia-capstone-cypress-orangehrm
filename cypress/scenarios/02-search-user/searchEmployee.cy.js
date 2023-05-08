/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe('search employee',() => {

    // login
    before(()=>{
        cy.visit('http://localhost/apps/orangehrm/web/index.php/auth/login')

        // set the browser window size
        cy.viewport(1920, 1080)
        // username
        cy.get('input[name="username"]').should('be.visible')
                                        .type('Admin')

        // password
        cy.get('input[name="password"]').should('be.visible')
                                        .type('Js092482!')

        // Click button
        cy.xpath('//button[@type="submit"]').should('be.visible')
                                          .click()

        // Dashboard has loaded on login
        cy.url().should('contain', '/dashboard/index')

        // Nav to PIM\Employee List
        
        // Sidepanel has loaded
        cy.xpath('//div[@class="oxd-sidepanel-body"]/descendant::ul')
            .should('be.visible')

        // PIM link has loaded
        cy.xpath('//div[@class="oxd-sidepanel-body"]/descendant::a/child::span[text()="PIM"]')         
            .should('be.visible')

        // XHR issues when dashboard cards still loading
        // Need to delay for 2 seconds until dashboard items finish loading
        cy.wait(2000)

        cy.visit('http://localhost/apps/orangehrm/web/index.php/pim/viewPimModule')

        cy.url().should('contain', '/pim/viewEmployeeList')

        cy.xpath('//h5[text()="Employee Information"]')
            .should('be.visible')
        cy.wait(2000)

        // Input into form
        cy.xpath('//label[contains(text(),"Employee Name")]/parent::div/following-sibling::div/descendant::input')
        .should('be.visible')
        .should('be.empty')
        .type('Alexandrus Maximus')

        // Search button is visible
        cy.xpath('//button[@type="submit"]')
            .should('be.visible')
            .click()
            .then(async ()=>{
                // ensure 1 match only
                cy.xpath('//div[@class="oxd-table-card"]').should('have.length', 1)
            })

        cy.wait(2000)

        // Click on only result
        cy.xpath('//div[@class="oxd-table-card"]').first()
            .click()
            .then( async ()=> {
                // will be redirected to profile details screen
                cy.url().should('contain', 'viewPersonalDetails')
                
                cy.get('[name="firstName"]').should('be.visible')
                        .should('have.value','Alexandrus')

                cy.get('[name="lastName"]').should('be.visible')
                        .should('have.value','Maximus')
            
                cy.xpath('//label[contains(text(),"Birth")]/parent::div/following-sibling::div/descendant::input')
                        .should('be.visible')
                        .should('have.value','1982-09-24')

                cy.xpath('//label[contains(text(),"Nationality")]/parent::div/following-sibling::div/descendant::div[contains(text(),"American")]')
                        .should('be.visible')
        })

        cy.wait(2000)
    })


    it('update user photo', ()=> {

        // Upload user photo
        cy.xpath('//img[@class="employee-image"]').should('be.visible')
            .click()
            .then( ()=> {
                cy.xpath('//h6[text()="Change Profile Picture"]').should('be.visible')

                //cy.get('input[type="file"]').should('be.visible')

                // Attach photo
                // As a fixture
                cy.fixture('demo_avatar.jpg', { encoding: null }).as('avatarFixture')

                // Need to force attachment since file input is hidden
                cy.get('input[type="file"]')
                    .selectFile('@avatarFixture', { force: true})

                // Ensure the file has been attached and displaying
                cy.xpath('//input[@type="file"]/following-sibling::div/descendant::img[contains(@src,"data:image/jpeg")]')
                    .should('be.visible')
                    
                // Wait for system to finish upload
                cy.wait(3000)

                // Save changes
                // As Cypress does not do visual image testing, a successful upload could
                // mean the image has uploaded and should display
                cy.xpath('//button[@type="submit"]').should('be.visible')
                                .click()
                                .then( async () => {
                                    // Finish saving
                                    cy.xpath('//h6[text()="Change Profile Picture"]').should('be.visible')
                                })

                //cy.wait(3000)
            }).then(()=>{
                // Upload file attachments

                cy.wait(5000)

                // Navigate to Personal Details tab
                cy.xpath('//a[text()="Personal Details"]')
                    .should('be.visible')
                    .click()
                    
                cy.xpath('//h6[text()="Personal Details"]')
                    .should('be.visible')
                    .then( ()=> {
                        // Enable the file input by clicking the Add button
                        cy.xpath('//h6[text()="Attachments"]/following-sibling::button').should('be.visible')
                                .click()
                        
                        // Attach file
                        // As a fixture
                        cy.fixture('demo_fileupload.pdf', { encoding: null }).as('fileUploadFixture')

                        // Need to force attachment since file input is hidden
                        cy.get('input[type="file"]')
                            .selectFile('@fileUploadFixture', { force: true})

                        cy.wait(2000)

                        // Submit upload
                        cy.xpath('//input[@type="file"]/ancestor::form/descendant::button[@type="submit"]')
                            .click()
                            .then( async () =>{
                                // Ensure the same file is uploaded and listed in the attachments table
                                cy.xpath('//div[@class="orangehrm-attachment"]/descendant::div[contains(text(),"demo_fileupload.pdf")]')
                                    .should('be.visible')
                        })
                    })
            })
    })

})