describe('Odyssey authentication tests', () => {

    it('se connecter à la page', () => {
        cy.visit('https://www.younited-credit.com')
    })
    /*
    it('champ non rempli projet, montant, durée', () => {
        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > :nth-child(1) > .wrapper-fieldset > .wrapper-input > .custom-select > #projectSelect')
            .select('HITECH').should('have.value', 'HITECH')
        
        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > :nth-child(2) > .wrapper-fieldset > .wrapper-input > .custom-select > #amount')
            .select('10K').should('have.value', '10K')

        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > .d-lg-flex > .wrapper-fieldset > .wrapper-input > .custom-select > #creditMaturity')
            .select('M12').should('have.value', 'M12')

                
        cy.get('#simulator_1 > .simulator > .simulator-select > .btn').click()
    } )
    */

    it('projet, montant, durée', () => {
        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > :nth-child(1) > .wrapper-fieldset > .wrapper-input > .custom-select > #projectSelect')
            .select('HITECH').should('have.value', 'HITECH')
        
        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > :nth-child(2) > .wrapper-fieldset > .wrapper-input > .custom-select > #amount')
            .select('10K').should('have.value', '10K')

        cy.get('#simulator_1 > .simulator > .simulator-select > .wrapper-group-input > .d-lg-flex > .wrapper-fieldset > .wrapper-input > .custom-select > #creditMaturity')
            .select('M12').should('have.value', 'M12')

        cy.wait(1000)
        
        cy.get('#simulator_1 > .simulator > .simulator-select > .btn').click()
        
        cy.url().should('contain', '/email')
    } )
    it('personalized offer, should fail when email is empty, you must enter email and get the next step', () => {
        // should fail when email is empty
            cy.get('#email-input')                    
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text')                       
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')  

        //  should fail when email is wrong  

        cy.get('#email-input').type('stypyopmail.com')                   
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.get('.error-msg > .text')                       
        cy.contains('L’adresse email saisie semble incorrecte. Merci de vérifier votre choix.').should('be.visible')
        cy.get('#email-input').type('{del}{selectall}{backspace}') 
        
        //personalized offer is successfull create

        cy.get('#email-input').type('styp@yopmail.com')               
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.wait(5000)
        cy.url().should('contain', '/familysituation')   
        
    } ) 
    
    it('fill the family situation', () => {
        // Registration should fail when all fields is empty
            cy.get('#maritalStatus-input')
            cy.get('#childNumberPropal-input')                  
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('#maritalStatus > .fieldset > .error-msg > .text')                      
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')  

        //  Registration should fail when number of child' field is empty 

       
        cy.get('#maritalStatus-input').select('SINGLE').should('have.value', 'SINGLE') 
        cy.get('#childNumberPropal-input')           
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.get('.error-msg > .text')                     
        cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
        cy.get('#maritalStatus-input').type('{selectall}{backspace}') 
      
        
       
        //  Registration should fail when your familly situation' field is empty 

       /*
        cy.get('#maritalStatus-input')
        cy.get('#childNumberPropal-input').select('0').should('have.value', '0') 
        cy.get('#childNumberPropal-input').type('{del}{selectall}{backspace}')           
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.get('.error-msg > .text')                     
        cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
        */
         //  personalized offer is successfull create

       
        cy.get('#maritalStatus-input').select('SINGLE').should('have.value', 'SINGLE')
        cy.get('#childNumberPropal-input').select('0').should('have.value', '0') 
        cy.get('[type="checkbox"]').uncheck({force:true})            
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.wait(5000)
        cy.url().should('contain', '/housing')
        // cy.get('[type="checkbox"]').check()  
              
    } )  

    it('fill the housing field', () => {
        // Registration should fail when all fields is empty
            cy.get('#housingStatus-input')                  
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text')                     
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')  

        //  Registration should fail when month and year fields are empty 
               
        cy.get('#housingStatus-input').select('TENANT').should('have.value', 'TENANT')
        cy.get('#housingStatusFrom-input-month')
        cy.get('#housingStatusFrom-input-year')           
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.get('.error-msg > .text')                     
        cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')

        //  Registration should fail when month and year fields contains letters 
               
        cy.get('#housingStatus-input').select('TENANT').should('have.value', 'TENANT')
        cy.get('#housingStatusFrom-input-month').type('mm')
        cy.get('#housingStatusFrom-input-year').type('aaaa')          
        cy.get('[data-test=navigator-compact-forward]').click()
        cy.get('.error-msg > .text')                     
        cy.contains('La donnée saisie semble incorrecte. Merci de vérifier votre choix').should('be.visible')
        cy.get('#housingStatusFrom-input-month',{timeout: 1000}).type('{selectall}{backspace}') 
        cy.get('#housingStatusFrom-input-year',{timeout: 1000}).type('{del}{selectall}{backspace}')
        
        
       
         //  Registration housing is successfull          
               
         cy.get('#housingStatus-input').select('TENANT').should('have.value', 'TENANT')
         cy.get('#housingStatusFrom-input-month',{timeout: 1000}).type(10)
         cy.get('#housingStatusFrom-input-year').type(2018)          
         cy.get('[data-test=navigator-compact-forward]').click()
         cy.url().should('contain', '/professionalsituation')        

    } )  
    
    it('fill professional situation', () => {
        // Registration should fail when activity sector field is empty
            cy.get('#activitySector-input')                 
            cy.get('#activitySector-input').select('INDEPENDENT').should('have.value', 'INDEPENDENT')
            cy.get('#profession-input')
            cy.get('[data-test=navigator-compact-forward]').click()
                                
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')  

        //  Registration failled  when month, years and radio fields are empty 
               
            cy.get('#activitySector-input').select('INDEPENDENT').should('have.value', 'INDEPENDENT')                 
            cy.get('#profession-input').select('FREELANCE').should('have.value', 'FREELANCE')
            cy.get('#businessActivityStartDate-input-month')
            cy.get('#businessActivityStartDate-input-year')
            cy.get('[data-di-id="di-id-d838032c-320c79b9"] > label')
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text') 
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
            //cy.get('#isCompanyBankrupt > div > dyn-errors')
            cy.get('.error-msg > .text') 
            cy.contains("Cochez la case s'il vous plaît").should('be.visible')
            //cy.url().should('contain', '/professionalsituation') 
            
            
        //  Registration is successful when all fields are full 
               
            cy.get('#activitySector-input').select('INDEPENDENT').should('have.value', 'INDEPENDENT')                 
            cy.get('#profession-input').select('FREELANCE').should('have.value', 'FREELANCE')
            cy.get('#businessActivityStartDate-input-month').type('05')
            cy.get('#businessActivityStartDate-input-year').type(2019)
            //cy.get('[type="radio"]').first().check({force:true}) 
            cy.get('[type="radio"]').check({force:true})
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.url().should('contain', '/incomes') 
     } )  

     it('fill monthly incomes', () => {
        // Registration should fail when all field are empty
            cy.get('#mainIncome-input')                
            cy.get('#housingAssistance-input')
            cy.get('#additionalIncome-input') 
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text') 
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')                   
                           
        //  Registration is successful when all fields are full 
               
            cy.get('#mainIncome-input').type(1800)                
            cy.get('#housingAssistance-input').type(0)
            cy.get('#additionalIncome-input').type(0) 
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.url().should('contain', '/outcomes') 
     } )  
     ///Bug a ce niveau 
     it('fill monthly outcomes', () => {
        // Registration should fail when all fields are empty
            cy.get('#rentAmount-input')               
            cy.get('#loanCount-input') 
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text')
            cy.wait(5000)
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande',{timeout: 2000}).should('be.visible')  
            cy.get('.error-msg > .text') 
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
                              
        
         // Registration should fail when APL field contain letter
            cy.get('#rentAmount-input').type('just')               
            cy.get('#loanCount-input').select('1').should('have.value', '1')
            cy.get('[data-test=navigator-compact-forward]').click()
            //cy.get('.error-msg > .text')
            cy.get('#rentAmount > .fieldset > .error-msg > .text') 
            cy.contains('La donnée saisie semble incorrecte. Merci de vérifier votre choix')  
            //cy.get('.error-msg > .text') 
            //cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible') 
     /*                   
        //  Registration is successful when all fields are full 
               
        cy.get('#rentAmount-input')               
            cy.get('#loanCount-input') 
            cy.get('[data-test=navigator-compact-forward]').click()
            cy.get('.error-msg > .text') 
            cy.contains('Ce montant ne peut être inférieur à 0 €').should('be.visible')  
            cy.get('.error-msg > .text') 
            cy.contains('Merci de renseigner cette information pour poursuivre votre demande').should('be.visible')                   
                           
        //cy.url().should('contain', '/incomes') 
        */
     } )  
           
        

    

    
  
       
    
      
        
    
    
   

})