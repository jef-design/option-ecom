const adminModel = require('../../models/admin/adminCredentials')
const jwt = require('jsonwebtoken')

const generateToken = (res, _id)=> {
    const token = jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '30d'})

    res.cookie('jwt', token,  {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 3,
      })

      return token
} 

const GoogleSignUp = async (req, res) => {
    const {name, email, picture} = req.body

    try {
        const existEmail = await adminModel.findOne({email})
        
        if(existEmail){
            throw Error('Email already exist')
        }
        const user = await adminModel.create({
            name, email, picture
        })
        generateToken(res, user._id)
        res.status(200).json({message: 'user sign up', user})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const GoogleSignIn = async (req, res) => {
    const {email} = req.body
    console.log(req.body)
    try {
        const existEmail = await adminModel.findOne({email})
        
        if(!existEmail){
            throw Error('Sign up this email first')
        }
        
        generateToken(res, existEmail._id)
        res.status(200).json({message: 'user sign up', existEmail})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const adminSignUp = async (req, res) => {
    
    const {name, email, password} = req.body
    console.log(req.body)
    try {
        const admin = await adminModel.signUp(name, email, password)
        const token = generateToken(res, admin._id)
        res.status(200).json({
            message: "Sign up user",
            admin,
            token
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const adminLogin = async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    try {
        const admin = await adminModel.signIn(email, password)
        const acctoken = generateToken(res, admin._id)
        res.status(200).json({
            message: "Sign In user",
            admin,
            acctoken
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
const adminLogOut = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        maxAge: new Date(1),
      });
      res.status(200).json({ message: 'user logged out'});
}

module.exports = {GoogleSignUp,GoogleSignIn,adminSignUp,adminLogin, adminLogOut}