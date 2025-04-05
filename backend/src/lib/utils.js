import jwt from "jsonwebtoken"

export const generateToken = (userId, res) => {
    //token generálás
    const token = jwt.sign({userId}, process.env.JWTSECRET, {expiresIn:"7d"});

    //cookieban küldés a usernek
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, //miliseconds
        httpOnly: true, //xss
        sameSite: "strict", //csrf
        secure: process.env.NODE_ENV !== "development" //false vagy true
    });

    return token;
}