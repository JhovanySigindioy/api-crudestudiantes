import { IServiceResponse, ISubject } from "../../interfaces";
import modelSubject from "../../models/modelSubject";

export const serviceDeleteSubject = async (id: string): Promise<IServiceResponse<ISubject>> => {
    try {
        const subject: ISubject | null = await modelSubject.findByIdAndDelete(id);

        if (!subject) {
            return {
                data: null,
                error: `Materia con id ${id} no encontrado`,
            };
        }
        return {
            data: subject,
            error: null,
        };
    } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? `Error al intentar borrar estudiante: ${error.message}` : `Error al intentar borrar estudiante`;
        return {
            data: null,
            error: errorMessage,
        };
    }
};