// cypress/integration/about_spec.ts
describe('Página "Sobre Nosotros"', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/Contact'); // Ajusta la ruta según la configuración de tu aplicación
  });

  it('Muestra los elementos y contenido esperados', () => {
    // Verifica que los elementos estén presentes
    cy.get('.background').should('exist');
    cy.get('h1').should('have.text', 'Sobre Nosotros');

    // Verifica el contenido del primer bloque
    cy.get('.content-box').eq(1).within(() => {
      cy.get('h2').should('have.text', '¿Quiénes somos?');
      cy.get('p').should('have.text', 'Somos un grupo de estudiantes de la Universidad de La Laguna (Tenerife) amantes de los juegos de cartas con el objetivo de crear una aplicacion web que todos los amantes de cartas puedan usar comodamente para compartir sus barajas.');
    });

    // Verifica el contenido del segundo bloque
    cy.get('.content-box').eq(2).within(() => {
      cy.get('h2').should('have.text', 'Contactanos');
      cy.get('lu').should('exist'); // Ajusta el selector según la estructura real del marcado
      cy.get('lu p').should('have.length', 2); // Ajusta según la cantidad real de elementos <p> dentro de <lu>
      cy.get('p').last().should('have.text', 'O en el telefono: +34 111 22 33 44');
    });
  });

  it('Muestra la imagen de fondo correctamente', () => {
    // Verifica que la imagen de fondo esté presente y cargada
    cy.get('.background').should('exist');
    cy.get('.background').should('have.css', 'background-image', 'url("https://wallpapercosmos.com/w/middle-retina/4/1/1/1430-3840x2160-desktop-4k-hearthstone-background-photo.jpg")');
  });
});

