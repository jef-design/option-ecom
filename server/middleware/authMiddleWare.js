const jwt = require('jsonwebtoken')
const Admin = require('../models/admin/adminCredentials')

const authMiddleWare = async (req, res, next) => {

    // console.log(req.cookies.jwt)
    const accessToken = req.cookies.jwt

    if(!accessToken){
        return res.status(201).json({message: 'No Token'})
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, async function(err, decoded) {
        if (err) {
            return res.status(401).json({ message: 'Token Expired',tokenExpired: err});
        }
        else {
            const {_id} = decoded
            req.user = await Admin.findOne({_id}).select('_id') 

            next()
            
          }
      });
    
    
}

module.exports = authMiddleWare


