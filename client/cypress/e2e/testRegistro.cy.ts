// cypress/integration/register_spec.ts
describe('Registro de Usuario', () => {
  beforeEach(() => {
    cy.visit('/register'); // Ajusta la ruta según la configuración de tu aplicación
  });

  it('Se intenta crear un usuario ya creado', () => {
    // Ingresa información en los campos de registro
    cy.get('#email').type('test@example.com');
    cy.get('#contrasena').type('password123');
    cy.get('#nombre').type('John Doe');

    // Envía el formulario de registro
    cy.get('form').submit();

    // Verifica que el mensaje de éxito sea visible
    cy.get('p').should('be.visible').and('have.text', 'Error: El usuario ya existe');

    // También puedes realizar más verificaciones si es necesario
  });

  it('Muestra un mensaje de error para correo no válido', () => {
    // Ingresa un correo no válido en el campo de correo
    cy.get('#email').type('invalid_email');

    // Envía el formulario de registro
    cy.get('form').submit();

    // Verifica que el mensaje de error sea visible
    cy.on('window:alert', (message) => {
      expect(message).to.equal('El correo electrónico no es válido'); // Ajusta el mensaje según tu aplicación
    });
  });

  it('Muestra un mensaje de error para contraseña corta', () => {
    // Ingresa información en los campos de registro
    cy.get('#email').type('test@example.com');
    cy.get('#nombre').type('John Doe');
    cy.get('#contrasena').type('short');

    // Envía el formulario de registro
    cy.get('form').submit();

    // Captura y verifica el mensaje de alerta
    cy.on('window:alert', (message) => {
      expect(message).to.equal('La contraseña debe tener al menos 6 caracteres'); // Ajusta el mensaje según tu aplicación
    });
  });
});
