import { Document } from "mongoose";
import { ISubject } from "./ISubject";

export interface IStudent extends Document {
    _id: string;
    name: string;
    registration: boolean;
    age: number;
    subjects: Partial<ISubject>[]; 
    __v: number;
}