const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  port: "3307",
  connectionLimit: 5,
  database: "node_express",
  timezone: "Asia/Seoul",
  skipSetTimezone: true,
});

async function db(sql) {
  let connection;
  try {
    connection = await pool.getConnection();
    const rows = await connection.query(sql);
    delete rows.meta;
    return rows;

    // const rows = await connection.query(sql, param);
    // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
  } catch (e) {
    console.error(e);
  } finally {
    // pool 반환
    if (connection) connection.release();
  }
}

// setUp();

module.exports = db;
