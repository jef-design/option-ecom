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


const adminSignUp = async (req, res) => {
    
    const {name, email, password} = req.body
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

module.exports = {adminSignUp,adminLogin, adminLogOut}