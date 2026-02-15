const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: "HotelManagement" });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         if (!process.env.MONGO_URI) {
//             throw new Error('MONGO_URI is not defined in .env file');
//         }

//         const conn = await mongoose.connect(process.env.MONGO_URI);

//         console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.error(`❌ Connection Error: ${error.message}`);
//         if (error.message.includes('auth')) {
//             console.error('👉 Tip: Check your Database User password and IP whitelist in Atlas!');
//         }
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
