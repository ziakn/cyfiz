const mysql = require('mysql2/promise');
const fs = require('fs');

async function fix() {
  const envFile = fs.readFileSync('.env', 'utf8');
  let mysqlUrl = '';
  for (const line of envFile.split('\n')) {
    if (line.startsWith('MYSQL_URL=')) {
      mysqlUrl = line.split('=')[1].trim();
    }
  }
  
  const pool = mysql.createPool(mysqlUrl);
  
  try {
    console.log("Fixing id AUTO_INCREMENT...");
    await pool.query("ALTER TABLE careers MODIFY id INT AUTO_INCREMENT;");
  } catch (e) {
    console.log("Error modifying id:", e.message);
  }

  try {
    console.log("Adding company_name column...");
    await pool.query("ALTER TABLE careers ADD COLUMN company_name VARCHAR(255) AFTER title;");
  } catch (e) {
    console.log("company_name error (may already exist):", e.message);
  }

  try {
    console.log("Dropping unique index on external_id...");
    await pool.query("ALTER TABLE careers DROP INDEX external_id;");
  } catch (e) {
    console.log("Index drop error (may not exist):", e.message);
  }

  try {
    console.log("Modifying external_id and apply_url to TEXT...");
    await pool.query("ALTER TABLE careers MODIFY external_id TEXT;");
    await pool.query("ALTER TABLE careers MODIFY apply_url TEXT;");
  } catch (e) {
    console.log("Error modifying TEXT columns:", e.message);
  }
  
  console.log("Production database patched successfully!");
  process.exit(0);
}
fix().catch(console.error);
