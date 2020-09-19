const mongoose = require('mongoose');
const {mongoUrl} = require('../config');


mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await mongoose.connect(mongoUrl);   
    }
    catch (err) {
      console.log(err);
    }
}

module.exports = connectToDb;