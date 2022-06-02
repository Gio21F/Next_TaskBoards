import mongoose, { Model, Schema } from 'mongoose';
import { IList } from '../interfaces';


const listSchema = new Schema({
    title: { type: String, required: true },
    descrption: { type: String },
    board: { 
        type: Schema.Types.ObjectId, 
        ref: 'Board', 
        required: true 
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Number, default: Date.now },
});

const ListModel: Model<IList> = mongoose.models.List || mongoose.model('List', listSchema);

export default ListModel;