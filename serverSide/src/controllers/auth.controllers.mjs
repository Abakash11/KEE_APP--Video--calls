import { upsertUser } from '../db_Connect/stream.js';
import User from '../models/User.mjs';
import jwt from 'jsonwebtoken';

export async function singup(req,res){
    const {fullName, email, password} = req.body;
    try{
        // Validate input
        if(!fullName || !email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        // Check password length
        if(password.length < 6){
            return res.status(400).json({message: 'Password must be at least 6 characters long'});
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // Create new user
        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName.trim().split(' ')[0]}`
        });
         // upsert StreamChatm 
        try {
            await  upsertUser({
            id: newUser._id.toString(),
            name: newUser.fullName,
            image: newUser.profilePic || '',
        })
        console.log('User upserted in Stream successfully');
        } catch (error) {
            console.error('Error upserting user in Stream:', error);
            return res.status(500).json({message: 'Internal server error'});
            
        }

        // genrate token
        const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        // save token in user coockis 
        res.cookie('token', token, {
            httpOnly: true, //prevent xss attacks
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: 'strict' //prevent CSRF attacks
        })
        // Return response
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
        });
    }
    catch(error){
        console.error('Error during signup:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export async function login(req,res){
    try {
        const {email, password} = req.body;
        // Validate input
        if(!email || !password){
            return res.status(400).json({message: 'All fields are required'});
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).json({message: 'User does not exist'});
        }
        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid password'});
        }
        // genrate token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        // save token in user coockis 
        res.cookie('token', token, {
            httpOnly: true, //prevent xss attacks
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            sameSite: 'strict' //prevent CSRF attacks
        })
        // Return response
        res.status(200).json({
            message: 'Login successful',
            user,
        });
    } catch (error) {
        console.log(`error in login controller: ${error}`);
        res.status(500).json({message: 'Internal server error'});
        
    }
}

export async function logout(req,res){
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
}

export async function onbording(req,res){
    
    try {
        const {netiveLanguage, learningLanguage, location, bio} = req.body;
        // Validate input
        if(!netiveLanguage || !learningLanguage || !location || !bio){
            return res.status(400).json({message: 'All fields are required',
                missingFields: [
                    !netiveLanguage && "Netive Language",
                    !learningLanguage && "Learning Language",
                    !location && "Location",
                    !bio && "Bio"
                ].filter(Boolean)
            });
        }
        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            {   
                ...req.body,
                isOnborded: true
            },
            {new: true}
        );
        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }
        try {
            await upsertUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || '',
            });
            console.log('User uppdated in Stream successfully');
            
        } catch (error) {
            console.error('Error upserting user in Stream:in onbording', error);
            return res.status(500).json({message: 'Internal server error'});
            
        }
        // Return response
        res.status(200).json({
            message: 'Onboarding successful',
            user: updatedUser,
        });
    } catch (error) {
        console.log(`error in onbording controller: ${error}`);
        res.status(500).json({message: 'Internal server error'});
    }
}