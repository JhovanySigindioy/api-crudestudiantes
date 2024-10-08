import { Document } from "mongoose";

export interface ISubject extends Document {
    _id: string;      // Identificador único del sujeto
    name: string;     // Nombre del sujeto
    __v?: number;     // Versión del documento (opcional)
}