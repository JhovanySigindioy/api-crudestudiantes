import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { serviceRegisterUser } from "../../services/auth"
import modelUser from "../../models/modelUser";

export const controllerRegisterUser = async (req: Request, res: Response): Promise<void> => {
    const { user, email, password } = req.body;
    try {
        const existingUser = await modelUser.findOne({ user });
        if (existingUser) {
            res.status(400).json({ message: "El usario ya existe", error: null });
            return
        }

        // Encripta la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const dataNewUser = {
            ...req.body,
            password: hashedPassword,
        }

        const { data, error } = await serviceRegisterUser(dataNewUser);
        if (error) {
            res.status(400).json({
                message: "Controller... Fallo la creacion del usaurio",
                error,
            });
            return;
        }

        res.status(201).json({
            message: "Usuario creado con éxito",
            data,
        });

    } catch (error) {
        res.status(201).json({
            message: "Usuario inesperado al crear el nuevo usuario",
            error,
        });
    }
}   