import mongoose, { Model, Schema } from 'mongoose';
import { Board } from '../interfaces';

export interface IBoard extends Board{}

const boardSchema = new Schema({
    title: { type: String, required: true },
    createdAt: { type: Number },
    list: [{
        type: Schema.Types.ObjectId,
        ref: 'List',
    }]
});

const BoardModel: Model<IBoard> = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default BoardModel;