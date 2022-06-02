import mongoose, { Model, Schema } from 'mongoose';
import { IBoard } from '../interfaces';

const boardSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Number, default: Date.now },
});

const BoardModel: Model<IBoard> = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default BoardModel;