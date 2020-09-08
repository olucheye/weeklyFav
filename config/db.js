const dotenv = require('dotenv').config();
const dbUri = process.env.dbUri;
const mongoose = require('mongoose');

const dbOptions = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
}

function initDB(){
   mongoose.connect(dbUri, dbOptions)
      .then(() => console.log(`:::> Database is now connected`))
      .catch(() => console.log(`:::> Error! Database couldn't be connected`))
}

module.exports = initDB;