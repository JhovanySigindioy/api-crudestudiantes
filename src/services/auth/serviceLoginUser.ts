import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IServiceResponse, IUser } from "../../interfaces";
import modelUser from "../../models/modelUser";

export const serviceLoginUser = async (dataUser: Partial<IUser>): Promise<IServiceResponse<string | null>> => {
    const { email, password } = dataUser;
    try {
        const userExisting: IUser | null = await modelUser.findOne({ email });
        if (!userExisting) {
            return {
                data: null,
                error: "Credenciales incorrectas"
            }
        }
        const isMatch: boolean = await bcrypt.compare(password!, userExisting.password);
        if (!isMatch) {
            return {
                data: null,
                error: "Credenciales incorrectas"
            }
        }

        const token = jwt.sign({ id: userExisting._id, user: userExisting.email }, 'my_secret_session', { expiresIn: '1h' });

        return {
            data: token,
            error: null,
        }
    } catch (error) {
        const errorMessage: string = error instanceof Error ? `Error al intentar iniciar sesion ${error.message}` : `Error al intentar iniciar sesion ${String(error)}`
        return {
            data: null,
            error: errorMessage,
        }
    }
}