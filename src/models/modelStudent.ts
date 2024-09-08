import mongoose, { Model, Schema } from "mongoose";
import { IStudent } from "../interfaces";

const schemaStudent: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    registration: {
        type: Boolean,
        required: true,
        default: false,
    },
    age: Number,
});

const modelStudent: Model<IStudent> = mongoose.model<IStudent>("Student", schemaStudent);

export default modelStudent;




