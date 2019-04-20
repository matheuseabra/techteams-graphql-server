const mongoose = require('mongoose');
const DB_LOCAL_URL = process.env.DB_LOCAL_URL || "mongodb://localhost:27017/techteams-graphql-db";

mongoose.connect(DB_LOCAL_URL, {
  useNewUrlParser: true
});

export default mongoose;
