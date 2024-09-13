import { IServiceResponse, IUser } from "../../interfaces";
import modelUser from "../../models/modelUser";

export const serviceRegisterUser = async (dataUser: Omit<IUser, "token">): Promise<IServiceResponse<IUser>> => {
    try {
        const user: IUser = await modelUser.create(dataUser);
        return {
            data: user,
            error: null
        }
    } catch (error) {
        const errorMessage: string = error instanceof Error ? `Error al crear nuevo usuario, ${error.message}` : `Error al crear nuevo usuario, ${error}`
        return {
            data: null,
            error: errorMessage,
        }
    }
}