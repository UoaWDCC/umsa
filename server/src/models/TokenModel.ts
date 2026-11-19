import mongoose, { Document, Schema } from "mongoose";

export interface ITokenDocument extends Document{
    token_hash: string; 
    user_id: string;
    scope: string;
    is_revoked: boolean;
    expire_at: Date;
};

const TokenHashSchema = new Schema<ITokenDocument> (
    {   
        // only the hashed string is stored
        token_hash: {type: String, required: true, unique: true},
        user_id: {type: String, required: true},
        scope: {type: String, required: true},
        is_revoked: {type: Boolean, required: true},
        expire_at: {type: Date, required: true}
    },
    { timestamps: true }
)

export default mongoose.model<ITokenDocument>("Token", TokenHashSchema);