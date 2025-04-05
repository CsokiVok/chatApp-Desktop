import User from "../models/user.js"
import bcrypt from "bcryptjs"
import{generateToken} from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
    const {name, email, password} = req.body
    try{
        //kitöltetlen mezők ellenőrzése
        if(!name || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }
        
        //jelszó hossz ellenőrzés
        if(password.length < 8){
            return res.status(400).json({message: "Password must be at least 8 characters"})
        }

        //megnézi hogy az email foglalt e
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "Email already exits"})
        }

        //jeszó hash
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPass
        })

        if(newUser){
            //mongodb _id-t tárol
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }else{
            res.status(400).json={message:"Invalid data"}
        }
    }catch(e){
        console.log("Sign up error (authController): " + e.message)
        res.status(500).json({message:"Internal server error"})
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.findOne({email})
        //ellenőrzi hogy van e ilyen user
        if(!user){
            return res.status(400).json({message: "Invalid email or password"})
        }

        //összehasonlítja a megadott jelszót az adatbázisban lévővel
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword){
            return res.status(400).json({message: "Invalid email or password"})
        }
        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic
        })

    }catch(e){
        console.log("Login error (authController): " + e.message)
        res.status(500).json({message:"Internal server error"})
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out"})
    } catch (e) {
        console.log("Logout error (authController) ")
        res.status(500).json({message: "Internal server error"})
    }
};

export const updateProfile = async(req, res) => {
    try {
        const {profilePic} = req.body
        //megnézzük melyik user
        const userId = req.user._id

        if(!profilePic){
            return res.status(400).json({message: "Profile picture is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)

        //user update az adatbázisban
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new:true})

        res.status(200).json(updateUser)
    } catch (error) {
        console.log("UpdateProfile error (authController): " + error)
        res.status(500).json({message: "Internal server error"})
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("CheckAuth error (athController)", error.message);
        res.status(500).json({message: "Internal server error"})
    }
};