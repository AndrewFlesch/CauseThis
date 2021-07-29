const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }) ;
  console.log('MondoDB Connected Cause This...');
} catch(err) {
  console.error(err.message);
  process.exit(1);
  //Exit process with failure
}
};

module.exports = connectDB;
