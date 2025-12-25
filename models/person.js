const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Define Person Schema 
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String, 
        enum: ['Chef', 'Waiter', 'Manager'],
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        type: String, 
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// personSchema.pre('save', async function(next){
//     const person = this;
//     //Hash the password only when it is modified or is new 
//     if (!person.isModified('password')) return next();
//     try{
//         //hash password generate
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(person.password, salt);
//         person.password = hashedPassword;
//         next(); 

//     }
//     catch(err){
//         return next(err);
//     }   
// });

personSchema.pre('save', async function () {
    // Hash password only if modified
    if (!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        console.log('Error comparing password: ', err);
        return false;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;