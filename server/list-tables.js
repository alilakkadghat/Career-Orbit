const sequelize = require("./config/database");

async function run() {
  try {
    await sequelize.authenticate();
    console.log("Connected to DB");
    
    // Force model definition loading
    require("./models/UserPG");
    
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log("Tables in database:", tables);
    
    const desc = await sequelize.getQueryInterface().describeTable('Users').catch(err => err.message);
    console.log("Describe Users table:", desc);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
