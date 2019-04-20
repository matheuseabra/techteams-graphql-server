const mongoose = require('mongoose');
const DB_LOCAL = process.env.DB_LOCAL || "mongodb://localhost:27017/techteams-graphql-db";
const DB_PROD = process.env.DB_PROD || "mongodb+srv://matheuseabra:abcd12@techteams-graphql-cluster-2hwqi.mongodb.net/test?retryWrites=true";
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

mongoose.connect(DB_PROD, {
  useNewUrlParser: true
});