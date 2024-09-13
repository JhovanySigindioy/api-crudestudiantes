import { Request, Response } from "express";
import { serviceLoginUser } from "../../services/auth";

export const controllerLoginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const { data, error } = await serviceLoginUser({ email, password });

        if (error) {
            const status = error.includes("incorrecto") ? 401 : 400;
            res.status(status).json({
                message: "Error de autenticación",
                data: error,
            });
            return;
        } else {
            res.status(200).json({
                message: "Inicio de sesión exitoso",
                data,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error inesperado al intentar iniciar sesión",
            data: error,
        });
    }
}
