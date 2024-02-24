const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

adminSchema.statics.signUp = async function(name, email, password){
    if(!name || !email || !password){
        throw Error('All fiels must be filled')
    }
    const salt = await bcrypt.genSalt()
    const hashedPass = await bcrypt.hash(password, salt)

    const admin = await this.create({
        name: name,
        email: email,
        password: hashedPass
    })

    return admin
}
adminSchema.statics.signIn = async function(email, password){

    const admin = await this.findOne({email})

    if(!email || !password){
        throw Error('All fiels must be filled')
    }

    if(!admin){
        throw Error("Invalid Credentials")
    }

    const match = await bcrypt.compare(password, admin.password)

    if(!match){
        throw Error('Wrong Password')
    }

    return admin

}

module.exports = mongoose.model('Admin', adminSchema)