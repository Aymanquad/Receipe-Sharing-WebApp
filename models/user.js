const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
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