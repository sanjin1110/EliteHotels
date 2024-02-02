import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,{
        expiresIn:'2d',
      }
      
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
// let invalidatedTokens = [];

// export const logout = (req, res) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).send("No token provided");
//     }

//     invalidatedTokens.push(token);

//     res.status(200).send("Logged out successfully");
//     res.redirect('/login');
// }
export const logout =  (req, res) => {
  req.session.destroy(err => {
    if (err) {
        console.log("Error destroying session:", err);
        return res.status(500).send("Internal Server Error");
    }
    
    res.status(200).send("Logged out successfully");
});
}


export const verifyUser = (req,res,next)=>{
    console.log('inside middleware')
    const authheader = req.headers.authorization
    console.log(authheader)

    if(!authheader) return res.status(401).json({error:"no auth token provided"})
    const token = authheader.split(' ')[1]
    
    jwt.verify(token,process.env.SECRET,(err,decoded)=>{
        if(err) return res.status(401).json({error:err.message})

        req.user = decoded

    })
    next()
}

export const verifyAdmin=(req,res,next)=>{
    if(req.user.role === 'admin') return next()
    res.status(403).json({error:"you are not authorized"})

}

