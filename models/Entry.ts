import mongoose, { Model, Schema } from 'mongoose';
import { IEntry } from '../interfaces';

const entrySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Number, default: Date.now },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;