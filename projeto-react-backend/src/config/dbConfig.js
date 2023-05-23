const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://mathe123:mathe123@test1.8sntu7h.mongodb.net/?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = connection