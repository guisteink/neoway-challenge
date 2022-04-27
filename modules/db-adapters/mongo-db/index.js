const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect()
{
    try {
        await mongoose.connect(process.env.MONGO_URI,
            { useNewUrlParser: true },
        )
    } catch (err) {
        console.error("Error connecting to mongodb", err);
    }
}

module.exports = { connect };