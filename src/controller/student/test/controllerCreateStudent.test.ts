import request from 'supertest';
import { startServer } from '../../../app';
import { serviceCreateStudent } from '../../../services/student';

jest.mock('../../../services/student'); // Mockea el servicio

describe('controllerCreateStudent', () => {
    describe('POST /students', () => {
        it('should create a student and return student data', async () => {
            const mockStudentData = {
                _id: '1',
                name: 'John Doe',
                age: 20,
                registration: true,
                subjects: [{ _id: 'subject1', name: 'Math', __v: 0 }],
            };

            // Mock del servicio para un resultado exitoso
            (serviceCreateStudent as jest.Mock).mockResolvedValue({ data: mockStudentData, error: null });

            const response = await request(startServer)
                .post('/students') // Asegúrate de que esta ruta coincida con tu configuración
                .send(mockStudentData); // Envía los datos del estudiante

            expect(response.status).toBe(201); // Verifica el estado de la respuesta
            expect(response.body).toEqual({
                message: "Estudiante creado con exito",
                student: mockStudentData,
            }); // Verifica que el cuerpo de la respuesta sea el esperado
        });

        it('should return an error if service returns an error', async () => {
            // Mock del servicio para un error
            (serviceCreateStudent as jest.Mock).mockResolvedValue({ data: null, error: 'Error creando estudiante' });

            const response = await request(startServer)
                .post('/students')
                .send({ name: 'John Doe' }); // Envía datos incompletos o erróneos

            expect(response.status).toBe(400); // Verifica que la respuesta tenga un estado 400
            expect(response.body).toEqual({
                message: "Error al crear al estudiante",
                error: 'Error creando estudiante',
            }); // Verifica que el cuerpo de la respuesta contenga el mensaje y error
        });

        it('should return a 500 error if an unexpected error occurs', async () => {
            // Mock del servicio para simular un error inesperado
            (serviceCreateStudent as jest.Mock).mockImplementation(() => {
                throw new Error('Error inesperado');
            });

            const response = await request(startServer)
                .post('/students')
                .send({ name: 'John Doe' }); // Envía datos

            expect(response.status).toBe(500); // Verifica que la respuesta tenga un estado 500
            expect(response.body).toEqual({
                message: "Fallo inesperado al crear estudiante",
                error: expect.any(Error), // Verifica que el cuerpo contenga un error
            });
        });
    });
});
