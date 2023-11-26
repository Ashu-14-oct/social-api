require('dotenv').config();
const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Post = require('../model/postSchema');


module.exports.home = async (req, res) => {
    try{
        return res.status(200).json({message: "hello its homepage"});
    }catch(err){
        console.log(err);
    }
}

//user sign up
module.exports.signup = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const user = await User.findOne({email: email});

        if(user){
            return res.status(422).json({message: "User with this email is already exist!"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            name,
            password: hashedPassword
        });

        const selectedObject = await User.findOne({email: email}).select("-password");

        return res.status(201).json({message: "Account created successfully", info: selectedObject});
    }catch(err){
        console.log(err);
    }
}

//user sign in
module.exports.signin = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(422).json({message: "User with this email is not exist!"});
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({message: "Incorrect password"});
        }

        const token = await jwt.sign({_id: user._id}, process.env.TOKEN);

        return res.status(200).json({message: "Logged in successfully", token: token});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

//create a post
module.exports.createPost = async (req, res) => {
    try{    
        const {caption, photo} = req.body;
        const newPost = await Post.create({
            caption,
            photo,
            user: req.user._id
        });

        req.user.posts.push(newPost);
        await req.user.save();

        const postId = newPost._id;
        const getPost = await Post.findById(postId).populate("user", "_id");
        console.log(getPost);
        return res.status(201).json({message: "Posted successfully!", Details: getPost});

    }catch(err) {
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    } 
}

//getpost
module.exports.getUsersPosts = async (req, res) => {
    try{
        const userData = await User.findById(req.user._id).populate("posts");
        const posts = userData.posts;
        return res.status(200).json({posts});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});
    }
}

// get all users posts
module.exports.getAllPosts = async (req, res) => {
    try{
        const allPosts = await Post.find();
        if(!allPosts){
            return res.status(404).json({message: "No posts found"});
        }

        return res.status(200).json({allPosts});
    }catch(err){
        console.log(err);
        return res.status(500).json({message: "Internal server error"});S
    }
}