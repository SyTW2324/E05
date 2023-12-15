import request from 'supertest';
import { app } from '../src/server';
import { expect } from 'chai';
import { User } from '../src/models/User';

describe('Usuarios API', () => {
  describe('POST /usuarios', () => {
    it('Crea un nuevo usuario correctamente y retorna un token', async () => {
      const response = await request(app)
        .post('/usuarios')
        .send({
          nombre: 'Nuevo Usuario',
          email: 'nuevo@usuario.com',
          contrasena: 'contrasena123',
        })
        .expect(201);

      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('nombre', 'Nuevo Usuario');
      expect(response.body).to.have.property('email', 'nuevo@usuario.com');
    });

    it('Retorna un error si faltan datos', async () => {
      const response = await request(app)
        .post('/usuarios')
        .send({ nombre: 'Nuevo Usuario', contrasena: 'contrasena123' })
        .expect(400);

      expect(response.body).to.have.property('error', 'Faltan datos');
    });

    it('Retorna un error si el usuario ya existe', async () => {
      const response = await request(app)
        .post('/usuarios')
        .send({
          nombre: 'Pablo',
          email: 'paburq@gmail.com',
          contrasena: 'pablo1234',
        })
        .expect(400);

      expect(response.body).to.have.property('error', 'El usuario ya existe');
    });
  });

  describe('POST /usuarios/login', () => {
    it('Inicia sesión correctamente y retorna un token', async () => {
      const response = await request(app)
        .post('/usuarios/login')
        .send({
          email: 'paburq@gmail.com',
          contrasena: 'pablo1234',
        })
        .expect(200);

      expect(response.body).to.have.property('token');
      expect(response.body).to.have.property('nombre', 'Pablo');
      expect(response.body).to.have.property('email', 'paburq@gmail.com');
    });

    it('Retorna un error con credenciales inválidas', async () => {
      const response = await request(app)
        .post('/usuarios/login')
        .send({
          email: 'correo@invalido.com',
          contrasena: 'contrasenaincorrecta',
        })
        .expect(401);

      expect(response.body).to.have.property(
        'error',
        'Credenciales inválidas'
      );
    });
  });

  // Limpiar el usuario creado al final de las pruebas
  after(async () => {
    await User.deleteOne({ email: 'nuevo@usuario.com' });
    process.exit(0);
  });
});
