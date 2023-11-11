// cypress/integration/home_spec.ts
describe('Página de Inicio', () => {
  it('Muestra la página de inicio con los elementos correctos', () => {
    cy.visit('/'); // Asegúrate de ajustar la ruta según la configuración de tu aplicación

    // Verifica que el título sea visible y tenga el texto correcto
    cy.get('.title').should('be.visible').and('have.text', 'Deck Helper');

    // Verifica que el mensaje de bienvenida sea visible y tenga el texto correcto
    cy.get('.message-container .message').eq(0).should('be.visible').and('have.text', 'Bienvenido a la mejor página web para poder subir y compartir mazos de Hearthstone');

    // Verifica que los botones de "Registrarse" e "Iniciar Sesión" sean visibles y tengan los enlaces correctos
    cy.get('.buttons .action-button').eq(0).should('be.visible').and('have.text', 'Registrarse').click();
    cy.url().should('include', '/register');

    // Regresar a la página principal
    cy.go('back');

    cy.get('.buttons .action-button').eq(1).should('be.visible').and('have.text', 'Iniciar Sesión').click();
    cy.url().should('include', '/login');
  });
});
