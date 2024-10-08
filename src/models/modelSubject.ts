import mongoose, { Model, Schema } from "mongoose";
import { ISubject } from "../interfaces";

const schemaSubject: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
});

const modelSubject: Model<ISubject> = mongoose.model<ISubject>("Subject", schemaSubject);

export default modelSubject;