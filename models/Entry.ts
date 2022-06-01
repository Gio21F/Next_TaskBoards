import mongoose, { Model, Schema } from 'mongoose';
import { IEntry } from '../interfaces';

const entrySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    color: { type: String },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List',
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;