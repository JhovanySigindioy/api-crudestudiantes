import { Document } from "mongoose";

export interface IUser extends Document {
    user: string;
    email: string;
    password: string;
}

