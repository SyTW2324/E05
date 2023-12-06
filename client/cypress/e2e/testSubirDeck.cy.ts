describe('Intento de crear un mazo con un nombre existente', () => {
    beforeEach(() => {
      // Inicia sesión antes de cada prueba
      cy.visit('http://localhost:8080/#/login');
      cy.get('#email').type('test@example.com');
      cy.get('#contrasena').type('password123');
      cy.get('form').submit();
    });
  
    it('Muestra un mensaje de error al intentar crear un mazo con un nombre existente', () => {
      
      cy.contains('Añadir un deck').click();

      
      cy.get('#nombreDeck').type('Guerrero control');
  
      
      cy.get('#carta0').type('Carta 1');
      cy.get('#carta1').type('Carta 2');
      cy.get('#carta2').type('Carta 3');
      cy.get('#carta3').type('Carta 4');
      cy.get('#carta4').type('Carta 5');
      cy.get('#carta5').type('Carta 6');
      cy.get('#carta6').type('Carta 7');
      cy.get('#carta7').type('Carta 8');
      cy.get('#carta8').type('Carta 9');
      cy.get('#carta9').type('Carta 10');
  
      // Envía el formulario
      cy.get('form').submit();
  
      // Verifica que se muestre un mensaje de error indicando que el nombre del deck ya existe
      cy.get('p').should('be.visible').and('have.text', 'Error: El deck ya existe');
    });
  });
  