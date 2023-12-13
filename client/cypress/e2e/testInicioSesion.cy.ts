describe('Inicio de sesion', () => {
    beforeEach(() => {
      cy.visit('/http://localhost:8080/#/login');
    });
  
    it('Se intenta iniciar sesión con un usuario creado', () => {
      // Ingresa información en los campos de registro
      cy.get('#email').type('test@example.com');
      cy.get('#contrasena').type('password123');
  
      // Envía el formulario de registro
      cy.get('form').submit();
  
      // Verifica que se redirija a la página de inicio
        cy.url().should('include', '/http://localhost:8080/#/Main');
  
    });
    it('Se intenta iniciar sesión con un usuario no creado', () => {
        // Ingresa información en los campos de registro
        cy.get('#email').type('test1@example.com');
        cy.get('#contrasena').type('password123');
    
        // Envía el formulario de registro
        cy.get('form').submit();
    
        // Verifica que se ve el mensaje de error correpondiente
        cy.get('p').should('be.visible').and('have.text', 'Error en la solicitud');
    
      });
  
    it('Muestra un mensaje de error para correo no válido', () => {
      // Ingresa un correo no válido en el campo de correo
      cy.get('#email').type('invalid_email');
  
      // Envía el formulario de registro
      cy.get('form').submit();
  
      // Verifica que el mensaje de error sea visible
      cy.on('window:alert', (message) => {
        expect(message).to.equal('El correo electrónico no es válido'); 
      });
    });
  });