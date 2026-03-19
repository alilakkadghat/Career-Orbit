const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;

if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL is not set. Database features will be disabled.');
    // Create a dummy instance that fails authentication gracefully
    sequelize = new Sequelize('sqlite::memory:', { logging: false });
    sequelize.authenticate = () => Promise.reject(new Error("No Database URL configured"));
} else {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: process.env.NODE_ENV === 'production' ? {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        } : {}
    });
}
module.exports = sequelize;
