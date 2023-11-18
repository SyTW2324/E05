describe('Página de Inicio con sesión iniciada', () => {
    beforeEach(() => {
        // Inicia sesión antes de cada prueba
        cy.visit('http://localhost:8080/#/login');  
        cy.get('#email').type('test@example.com');
        cy.get('#contrasena').type('password123');
        cy.get('form').submit();
    });

    it('Funciona correctamente', () => {
        cy.visit('http://localhost:8080/#/Main');
    
        // Verifica que el componente esté presente
        cy.get('.main-page').should('exist');
    
        // Verifica el contenido del componente
        cy.get('h1').should('contain', 'Bienvenido');
    
        // Realiza alguna interacción, como hacer clic en un botón
        cy.contains('Añadir un deck').click();
    
        // Verifica que la nueva ruta sea correcta
        cy.url().should('include', '/add-deck');
      });
  });