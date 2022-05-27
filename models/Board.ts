import mongoose, { Model, Schema } from 'mongoose';
import { IBoard } from '../interfaces';

const boardSchema = new Schema({
    title: { type: String, required: true },
    list: [{
        type: Schema.Types.ObjectId,
        ref: 'List',
    }]
}, {
    timestamps: true,
});

const BoardModel: Model<IBoard> = mongoose.models.Board || mongoose.model('Board', boardSchema);

export default BoardModel;