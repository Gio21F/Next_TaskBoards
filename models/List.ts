import mongoose, { Model, Schema } from 'mongoose';
import { IList } from '../interfaces';


const listSchema = new Schema({
    title: { type: String, required: true },
    entries: [{
        type: Schema.Types.ObjectId,
        ref: 'Entry',
    }]
}, {
    timestamps: true,
});

const ListModel: Model<IList> = mongoose.models.List || mongoose.model('List', listSchema);

export default ListModel;