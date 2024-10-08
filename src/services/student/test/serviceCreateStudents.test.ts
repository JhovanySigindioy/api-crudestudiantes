import { serviceCreateStudent } from '../serviceCreateStudent';
import modelStudent from '../../../models/modelStudent';
import { IStudent, ISubject } from '../../../interfaces';

// Mocks de datos
const mockSubjectData: Pick<ISubject, '_id' | 'name' | '__v'> = {
    _id: 'subject1',
    name: 'Math',
    __v: 0,
};

const mockStudentData: Partial<IStudent> = {
    _id: '1',
    name: 'John Doe',
    age: 20,
    registration: true,
    subjects: [mockSubjectData],
    __v: 0,
};

// Creamos mocks para el modelo de estudiante
jest.mock('../../../models/modelStudent', () => {
    const mockSave = jest.fn().mockResolvedValue({
        _id: '1',
        name: 'John Doe',
        age: 20,
        registration: true,
        subjects: [{
            _id: 'subject1',
            name: 'Math',
            __v: 0,
        }],
        __v: 0,
    });

    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            save: mockSave,
        })),
    };
});

// Prueba unitaria
describe('serviceCreateStudent', () => {
    it('should create a student and return the student data', async () => {
        const studentInstance = new modelStudent(mockStudentData); // Crea una instancia del mock
        const result = await serviceCreateStudent(mockStudentData as IStudent);

        // Compara solo la parte relevante del resultado
        expect(result.data).toEqual(mockStudentData);
        expect(result.error).toBeNull(); // Verifica que error sea null
        expect(studentInstance.save).toHaveBeenCalledTimes(1); // Verifica que save fue llamado
        expect(studentInstance.save).toHaveBeenCalledWith();
    });
});
