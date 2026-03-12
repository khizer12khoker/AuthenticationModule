const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.signup = async (req,res)=>{

 const { username, email, password } = req.body

 if(!username || !email || !password){
  return res.status(400).json({message:"All fields are required"})
 }

 const emailRegex = /\S+@\S+\.\S+/
 if(!emailRegex.test(email)){
  return res.status(400).json({message:"Invalid email format"})
 }
 const userExists = await User.findOne({
  $or:[{username},{email}]
 })

 if(userExists){
  return res.status(400).json({message:"Username or Email already exists"})
 }

 const hashed = await bcrypt.hash(password,10)

 const user = new User({
  username,
  email,
  password:hashed
 })

 await user.save()

 res.json({message:"User created successfully"})
}
exports.login = async (req,res)=>{

 const { email, password } = req.body

 if(!email || !password){
  return res.status(400).json({ message:"Email and password are required" })
 }

 const user = await User.findOne({ email })
 if(!user) return res.status(400).json({ message:"User not found" })

 const valid = await bcrypt.compare(password, user.password)
 if(!valid) return res.status(400).json({ message:"Incorrect password" })

 const token = jwt.sign({ id:user._id, role:user.role }, "secret123")

 res.json({ token, role:user.role })
}


// PROFILE
exports.profile = async (req,res)=>{
 const user = await User.findById(req.userId)
 res.json(user)
}


exports.getUsers = async (req,res)=>{
 const users = await User.find()
 res.json(users)
}


exports.updateProfile = async (req,res)=>{

 const updatedUser = await User.findByIdAndUpdate(
  req.userId,
  {
   username:req.body.username,
   email:req.body.email
  },
  { new:true }
 )

 res.json(updatedUser)
}


exports.deleteUser = async (req,res)=>{
 await User.findByIdAndDelete(req.params.id)
 res.send("User deleted")
}