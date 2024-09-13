import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Obtener el token de los encabezados de autorización
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token faltante" });
    }

    try {
        // Verificar el token
        const verified = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        // Si es válido, lo asignamos al objeto `req.user` para que esté disponible en la ruta
        req.body.user = verified;
        next(); // Continuar a la siguiente función o ruta
    } catch (error) {
        return res.status(401).json({ message: "Token no válido" });
    }
};
