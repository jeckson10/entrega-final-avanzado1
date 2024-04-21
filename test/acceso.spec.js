const request = require('supertest');
const Server = require('../models/server');
const server = new Server();

const token = "12345";

describe('GET /api/acceso', () => {
    it('Debería devolver una respuesta JSON', async () => {
        const response = await request(server.app).get('/api/acceso').send();

        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });
});


//Pruebas para validar el login 

//prieba 1 validar inicio de secion
describe('Inicio de Sesión', () => {
    it('Estado 200, las credenciales son válidas', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send( { username: 'camilo', password: 'camilo1999' });
            
        
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Inicio de sesión exitoso');
    });
// Prueba 2 validar si la contrasela no cumple con los requisitos
    it('estado 400,la contraseña no cumple con los requisitos', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send({ username: 'jeckson', password: '0999' });

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('La contraseña debe tener al menos 8 caracteres y ser alfanumérica');
    });
//prueba 3 valida si las credenciales son invalidas
    it('Código de estado 401 si las credenciales son inválidas', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send({ username: 'jeckson', password: 'jeckson19' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Credenciales inválidas');
    });

  });


  describe('Inicio de Sesión', () => {
    // Prueba 4 valida si hay Credenciales faltantes
    it('Código de estado 400, falta el nombre de usuario o la contraseña', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send({ username: 'camilo', password: '' });

        expect(response.statusCode).toBe(400);
        
    });

    // Prueba 5 valida si el Nombre de usuario es incorrecto
    it('Código de estado 401, el nombre de usuario es incorrecto', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send({ username: 'jeck', password: 'jeckson1999' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Credenciales inválidas');
    });

    // Prueba 6 valida si la Contraseña es incorrecta
    it('Código de estado 401, la contraseña es incorrecta', async () => {
        const response = await request(server.app)
            .post('/api/acceso/login')
            .send({ username: 'jeckson', password: 'jeckson999' });

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Credenciales inválidas');
    });
});


