import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function createAuthToken(data) {
    const token = jwt.sign(data, process.env.SECRET_TOKEN,{
        expiresIn:84600 * 400, //expire in 24 hours
    });
return token;
}

export {createAuthToken};