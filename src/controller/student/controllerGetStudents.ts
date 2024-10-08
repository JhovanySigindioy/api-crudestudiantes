import { Request, Response } from 'express';
import { serviceGetStudents } from '../../services/student';


export const controllerGetStudents = async (req: Request, res: Response): Promise<void> => {
    try {
        const { data, error } = await serviceGetStudents();
        if (error) {
            res.status(400).json({
                message: "Error obteniendo datos de estudiantes",
                data: error,
            });
            return;
        }
        res.status(200).json({
            message: "Datos obtenidos satisfactoriamente",
            data,
        });
    } catch (error) {
        console.error('Error obteniendo datos de estudiantes', error);
        res.status(500).json({
            message: "Error obteniendo datos de estudiantes",
            data: error,
        });
    }
};
