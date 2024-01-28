const { default: mongoose } = require("mongoose");

exports.Connection =  mongoose.connect('mongodb://localhost:27017/Receipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(3000, () => {
        console.log('Express server is running on port 3000');
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
