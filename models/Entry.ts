import mongoose, { Model, Schema } from 'mongoose';
import { IEntry } from '../interfaces';

const entrySchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
});

const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;