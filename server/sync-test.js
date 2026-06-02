const sequelize = require("./config/database");
const User = require("./models/UserPG");

async function run() {
  try {
    const [results] = await sequelize.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname = 'public';");
    console.log("pg_tables results:", results.map(r => r.tablename));
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

run();
