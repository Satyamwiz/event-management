import jwt from 'jsonwebtoken'
export const generateToken=(userid,res)=>{
    const token=jwt.sign({userid},process.env.jwtsecret,{expiresIn:"2d"})
    // console.log("done")
    res.cookie("jwt", token, {
        httpOnly: true,     // Prevents client-side scripts from accessing the cookie
        sameSite: "none",   // Allows the cookie to be sent in cross-site requests
        secure: true,       // Ensures the cookie is sent only over HTTPS
        // domain: ".yourdomain.com" // Set to your root domain or a specific subdomain
    });
    
}
