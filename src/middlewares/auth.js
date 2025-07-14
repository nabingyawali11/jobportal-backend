import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";

dotenv.config();

const auth = async (req,res,next) => {
    // console.log("Header",req.headers);
    // console.log("Request=:{}",req);
    const authHeader = req.headers?.authorization;
    let authToken;

    if(authHeader && authHeader.startsWith("Bearer ")){
        authToken = authHeader.split(" ")[1];
        
    }else{
        const cookie=req.headers.cookie;
        if(!cookie) return res.status(401).send("Unauthorized....");

        authToken = cookie.split('=')[1];
    }
    if(!authToken) return res.status(401).send("Unauthorized!!!");

    jwt.verify(authToken,process.env.SECRET_TOKEN, function(error,data){
        // console.log(token);
        if(error){
            return res.status(401).send("Unauthorized...!");
        }
         console.log("Data",data);
        req.user=data;

        next();
    })
}

export default auth;