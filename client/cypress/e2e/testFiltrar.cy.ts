describe('Página de Búsqueda', () => {
  beforeEach(() => {
    // Inicia sesión antes de cada prueba
    cy.visit('http://localhost:8080/#/login');
    cy.get('#email').type('paburq@gmail.com');
    cy.get('#contrasena').type('pablo1234');
    cy.get('form').submit();
  });

  it('Realiza una búsqueda y muestra resultados correctamente', () => {

    cy.contains('Buscar un deck').click();

    // Ingresa un término de búsqueda (por ejemplo, "guerrero")
    cy.get('input').type('guerrero');
    
    cy.wait(1000);

    cy.get('button').contains('Buscar').click();

    cy.wait(1000);

    // Asegúrate de que la búsqueda se haya completado antes de continuar
    cy.get('.deck-card').should('have.length.greaterThan', 0);

    // Verifica que los resultados se muestren correctamente
    cy.get('.deck-name-button').should('contain', 'Guerrero control');


  });

  it('Realiza una búsqueda y muestra resultados correctamente', () => {

    cy.contains('Buscar un deck').click();

    // Ingresa un término de búsqueda (por ejemplo, "guerrero")
    cy.get('input').type('picaro');
    
    cy.wait(1000);

    cy.get('button').contains('Buscar').click();

    cy.wait(1000);

    // Asegúrate de que la búsqueda se haya completado antes de continuar
    cy.get('.deck-card').should('have.length.greaterThan', 0);

    // Verifica que los resultados se muestren correctamente
    cy.get('.deck-name-button').should('contain', 'picaro pirata');

  });

  it('Realiza una búsqueda y no muestra nada', () => {
      
      cy.contains('Buscar un deck').click();
  
      // Ingresa un término de búsqueda (por ejemplo, "guerrero")
      cy.get('input').type('mago');

      cy.wait(1000);

      cy.get('button').contains('Buscar').click();

      cy.wait(1000);

      cy.get('.deck-card').should('have.length', 0);

      cy.get('p').should('contain', 'No hay mazos que coincidan con la búsqueda');

    });

  });