const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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
    },
    my_recipes: {
        type : Array,
    },
    my_favourites :{
        type: Array,
    }

})




module.exports = mongoose.model('User', userSchema);