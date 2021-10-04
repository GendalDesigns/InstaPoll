const mongoose = require("mongoose")

//a place to define the model and validations
const InstaPollSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "must have a question"],
        minlength: [3, "Need at least 3 characters"],
        // answer=[],
    },
    //question holds an array of IDs
    answer: {
        type: String,
        // required: [true, "must have an answer"],
        minlength: [2, "Need at least 2 characters"]
    },
    active: {
        type: Boolean,
    },
}, {timestamps: true})

//here is where the model is defined to interact with the database and passed into mongoose
const InstaPoll = mongoose.model("InstaPoll", InstaPollSchema);

//allows other files to interact with the model, so they can import it
module.exports = InstaPoll;


/* 

const InstaPollSchema2 = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "must have a question"],
        minlength: [3, "Need at least 3 characters"],
        answer=[],
    },
    
    active: {
        type: Boolean,
    },
}, {timestamps: true}) */



/* let CarSchema = new mongoose.Schema({
    make: String,
    model: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: UserSchema
    }
})


let UserSchema = new mongoose.Schema({
    name: String,
    age: String,
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: CarSchema
    }]
})

//endresult as if its a JSON file:
[
{
    cars: [
        _id: a;lskdjfa;lksdjf,
        make:
        ...CarSchema,
    ],
    id: alksjdfaa;slkdjfasdfas,
    name:alksjdfaa
    age:asdfasdf
}
] */

// module.exports = mongoose.model("car", CarSchema)