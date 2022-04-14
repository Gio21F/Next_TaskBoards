import mongoose, { Model, Schema } from 'mongoose';
import { List } from '../interfaces';

export interface IList extends List{}

const listSchema = new Schema({
    title: { type: String, required: true },
    createdAt: { type: Number },
    entries: [{
        type: Schema.Types.ObjectId,
        ref: 'Entry',
    }]
});

const ListModel: Model<IList> = mongoose.models.List || mongoose.model('List', listSchema);

export default ListModel;