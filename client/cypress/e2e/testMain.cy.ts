describe('Página de Inicio con sesión iniciada', () => {
  beforeEach(() => {
    // Inicia sesión antes de cada prueba
    cy.visit('http://localhost:8080/#/login');
    cy.get('#email').type('paburq@gmail.com');
    cy.get('#contrasena').type('pablo1234');
    cy.get('form').submit();
  });

  it('Funciona correctamente', () => {
    cy.visit('http://localhost:8080/#/Main');

    // Verifica que el componente esté presente
    cy.get('.main-page').should('exist');

    // Verifica el contenido del componente
    cy.get('h1').should('contain', 'Bienvenido');

    // Realiza alguna interacción, como hacer clic en un botón
    cy.contains('Buscar un deck')

    // Realiza alguna interacción, como hacer clic en un botón
    cy.contains('Añadir un deck').click();

    // Verifica que la nueva ruta sea correcta
    cy.url().should('include', '/SubirDeck');
  });

  it('Se puede ir a la página de mazos', () => {
    cy.visit('http://localhost:8080/#/Main');

    cy.contains('Guerrero control').click();

    cy.contains('Embate con escudo')

    cy.contains('Este es un mazo muy bueno')


  });
});