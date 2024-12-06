import mongoose, { Schema, Document } from 'mongoose';

export const Tasks: Schema = new Schema({
    title: {type: String, requared: true},
    completed: {type: Boolean, default:false},

})