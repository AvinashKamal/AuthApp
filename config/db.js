

const MongoClient = require('mongodb').MongoClient;

const connectDb = async () => {
    try {

        MongoClient.connect(process.env.MONGO_URI, {useUnifiedTopology: true}, function (err, db){
            if(err){
                console.log(`Unable to connect to the database ${err.message}`);
            } else {
                console.log(`Connected Successfully`);
                db.close();
            }
        })
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;