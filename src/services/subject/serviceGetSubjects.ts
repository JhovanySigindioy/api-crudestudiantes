
import { IServiceResponse, ISubject } from "../../interfaces";
import modelSubject from "../../models/modelSubject";

export const serviceGetSubjects = async (): Promise<IServiceResponse<ISubject[]>> => {
    try {
        const subjects: ISubject[] = await modelSubject
            .find()
            .exec();
        return {
            data: subjects,
            error: null,
        }
    } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? `Error al intentar obtener las materias: ${error.message}` : `Error al intentar obtener las materias`
        return {
            data: null,
            error: errorMessage,
        }
    }
}