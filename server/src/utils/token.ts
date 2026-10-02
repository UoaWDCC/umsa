import Token from "../models/TokenModel.js"
import crpyto from 'crypto';

export async function createSecureToken(userId:string) {
    const rawToken = crpyto.randomBytes(32).toString('hex');
    const tokenHash = crpyto.createHash('sha256').update(rawToken).digest('hex')


    // creates the expiration time, 
    // set at 30 minutes from creation time right now
    const createdAt = new Date()
    const expireAt = new Date(createdAt.getTime() + (60 * 30 * 1000))

    await Token.create({
        token_hash: tokenHash,
        user_id: userId,
        scope: "admin_create_account",
        is_revoked: false,
        expire_at: expireAt,
    });

    return rawToken

}