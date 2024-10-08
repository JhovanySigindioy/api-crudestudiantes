import { IServiceResponse, IStudent } from "../../interfaces";
import modelStudent from "../../models/modelStudent";

export const serviceGetStudents = async (): Promise<IServiceResponse<IStudent[]>> => {
    try {
        const students: IStudent[] = await modelStudent.find().populate("subjects").exec();
        return {
            data: students,
            error: null
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? `Error inesperado: ${error.message}` : `Error inesperado: ${error}`
        return {
            data: null,
            error: errorMessage,
        };  
    }
};
