import { IServiceResponse, ITeacher } from "../../interfaces";
import modelTeacher from "../../models/modelTeacher";

export const serviceCreateTeacher = async (TeacherData: ITeacher): Promise<IServiceResponse<ITeacher>> => {
    try {
        const Teacher: ITeacher = await modelTeacher.create(TeacherData);
        return {
            data: Teacher,
            error: null,
        }
    } catch (error: unknown) {
        const errorMessage: string = error instanceof Error ? `Error al intentar crear profesor: ${error.message}` : `Error al intentar crear profesor`
        return {
            data: null,
            error: errorMessage,
        }
    }
}