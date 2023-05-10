export default class SearchUser {
    // private class attributes
    #sidepanel
    #linkpim
    #urlpim
    #headeremployeeinfo
    #inputsearch
    #buttonsave
    #rowresult
    #inputfirstname
    #inputlastname
    #inputdatepicker
    #selectnationality
    #userphoto
    #headerchangephoto
    #inputfile
    #blobphoto
    #linkpersonaldetails
    #headerpersonaldetails
    #headerattachmentsform
    #buttonattachments
    #resultattachment

    // initialize values in constructor
    constructor(params){
        this.#sidepanel = params.sidepanel
        this.#linkpim = params.linkpim
        this.#urlpim = params.urlpim
        this.#headeremployeeinfo = params.headeremployeeinfo
        this.#inputsearch = params.inputsearch
        this.#buttonsave = params.buttonsave
        this.#rowresult = params.rowresult

        this.#inputfirstname = params.inputfirstname
        this.#inputlastname = params.inputlastname
        this.#inputdatepicker = params.inputdatepicker
        this.#selectnationality = params.selectnationality
        this.#userphoto = params.userphoto

        this.#headerchangephoto = params.headerchangephoto
        this.#inputfile = params.inputfile
        this.#blobphoto = params.blobphoto

        this.#linkpersonaldetails = params.linkpersonaldetails
        this.#headerpersonaldetails = params.headerpersonaldetails
        this.#headerattachmentsform = params.headerattachmentsform
        this.#buttonattachments = params.buttonattachments
        this.#resultattachment = params.resultattachment
    }

    verifyDashboardHasLoaded(){
        // Dashboard has loaded on login
        cy.url().should('contain', '/dashboard/index')

        // Nav to PIM\Employee List
        
        // Sidepanel has loaded
        cy.xpath(this.#sidepanel).should('be.visible')

        // PIM link has loaded
        cy.xpath(this.#linkpim).should('be.visible')

        // XHR issues when dashboard cards still loading
        // Need to delay for 2 seconds until dashboard items finish loading
        cy.SetWaitTime(2000)

        cy.visit(this.#urlpim)

        cy.url().should('contain', '/pim/viewEmployeeList')

        cy.xpath(this.#headeremployeeinfo)
            .should('be.visible')

        cy.SetWaitTime(2000)

        return this
    }

    inputSearchForm(){
        // Input into form
        cy.xpath(this.#inputsearch)
        .should('be.visible')
        .should('be.empty')
        .type('Alexandrus Maximus')

        // Search button is visible
        cy.xpath(this.#buttonsave)
            .should('be.visible')
            .click()
            .then(async ()=>{
                // ensure 1 match only
                cy.xpath(this.#rowresult).should('have.length', 1)
            })

        cy.SetWaitTime(2000)

        return this
    }

    loadPersonalDetails(){
        // Click on only result
        cy.xpath(this.#rowresult).first()
            .click()
            .then( async ()=> {
                // will be redirected to profile details screen
                cy.url().should('contain', 'viewPersonalDetails')
                
                cy.get(this.#inputfirstname).should('be.visible')
                        .should('have.value','Alexandrus')

                cy.get(this.#inputlastname).should('be.visible')
                        .should('have.value','Maximus')
            
                cy.xpath(this.#inputdatepicker)
                        .should('be.visible')
                        .should('have.value','1982-09-24')

                cy.xpath(this.#selectnationality)
                        .should('be.visible')
        })

        cy.SetWaitTime(2000)

        return this
    }

    // process the upload tests
    upload(){
        cy.xpath(this.#userphoto).should('be.visible')
            .click()
            .then(()=>{
                this.#uploadUserPhoto()
            })
            .then(()=>{
                this.#uploadFileAttachments()
            })
        return this
    }

    #uploadUserPhoto(){
        // Upload user photo
        cy.xpath(this.#headerchangephoto).should('be.visible')

        //cy.get('input[type="file"]').should('be.visible')

        // Attach photo
        // As a fixture
        cy.fixture('demo_avatar.jpg', { encoding: null }).as('avatarFixture')

        // Need to force attachment since file input is hidden
        cy.get(this.#inputfile)
            .selectFile('@avatarFixture', { force: true})

        // Ensure the file has been attached and displaying
        cy.xpath(this.#blobphoto)
            .should('be.visible')
            
        // Wait for system to finish upload
        cy.SetWaitTime(3000)

        // Save changes
        // As Cypress does not do visual image testing, a successful upload could
        // mean the image has uploaded and should display
        cy.xpath(this.#buttonsave).should('be.visible')
            .click()
            .then( async () => {
                // Finish saving
                cy.xpath(this.#headerchangephoto).should('be.visible')
            })
    }

    #uploadFileAttachments(){
        // Upload file attachments

        cy.SetWaitTime(5000)

        // Navigate to Personal Details tab
        cy.xpath(this.#linkpersonaldetails)
            .should('be.visible')
            .click()
            
        cy.xpath(this.#headerpersonaldetails)
            .should('be.visible')
            .then( ()=> {
                // Enable the file input by clicking the Add button
                cy.xpath(this.#headerattachmentsform).should('be.visible')
                        .click()
                
                // Attach file
                // As a fixture
                cy.fixture('demo_fileupload.pdf', { encoding: null }).as('fileUploadFixture')

                // Need to force attachment since file input is hidden
                cy.get(this.#inputfile)
                    .selectFile('@fileUploadFixture', { force: true})

                cy.SetWaitTime(2000)

                // Submit upload
                cy.xpath(this.#buttonattachments)
                    .click()
                    .then( async () =>{
                        // Ensure the same file is uploaded and listed in the attachments table
                        cy.xpath(this.#resultattachment)
                            .should('be.visible')
                })
            })
    }

    takeScreenshot(){
        cy.screenshot()
        return this
    }


}