const mongoose = require('mongoose');

const publicSchema = mongoose.Schema({
    
    recipeObj : {
        type: Object,
        required: true
    },
    // stars : {
    //     type: String,
    //     required: true
    // },

})




module.exports = mongoose.model('Public', publicSchema);