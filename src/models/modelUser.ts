import mongoose, { Model, Schema } from "mongoose";
import { IUser } from "../interfaces";

const schemaUser: Schema = new Schema({
    user: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const modelUser: Model<IUser> = mongoose.model<IUser>("User", schemaUser);

export default modelUser;