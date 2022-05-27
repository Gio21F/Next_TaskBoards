import mongoose, { Model, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema({
    name: { type: String, required: true },
    role:{
        type: String,
        enum: ['admin', 'user'],
        message: '{VALUE} is not valid',
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, default: true },
    image: { type:String },
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'Board',
    }]
}, {
    timestamps: true,
});

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;