const mongoose = require('mongoose');

const publicSchema = mongoose.Schema({
    
    recipeObjects : {
        type: Array,
        required: true
    },
    // stars : {
    //     type: String,
    //     required: true
    // },

})




module.exports = mongoose.model('Public', publicSchema);