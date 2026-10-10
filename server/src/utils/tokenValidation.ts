import Token from "../models/TokenModel.js"
import crpyto from 'crypto';

export async function tokenValidator(rawToken: string) {
    const hashedToken = crpyto.createHash('sha256').update(rawToken).digest('hex')
    const currentTime = new Date()
    const tokenDoc = await Token.findOne({token_hash: hashedToken})

    if (tokenDoc === null) {
        throw new Error("Could not find the token in the Database")
    }

    const tokenExpiryTime =  tokenDoc.expire_at

    if (currentTime > tokenExpiryTime) {
        throw new Error("Token has expired, please send another one")
    }

    if (tokenDoc.is_revoked) {
        throw new Error("Token has been revoked, please send another one")
    }
    
    return tokenDoc

}