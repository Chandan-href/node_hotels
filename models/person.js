const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Define the person schema
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
        enum: ['Chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


//Hashing and salting of password
personSchema.pre('save', async function(next) {
    const person = this;    // personSchema me kisi bhi record me save operation perform hopga

    //Hash the only if it has beed modidied(or is new)
    if(!person.isModified('password')) return next();

    try{
        //hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Override the plain password with the Hashed one
        person.password = hashedPassword;
        next();
    }
    catch(err) {
            next(err);
    }
})


personSchema.methods.comparePassword = async function(candidatePassword) {
     try {
        //Use bcrypt  to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
     }
     catch(err) {
        throw err;
     }
}






//creating Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;