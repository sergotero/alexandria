import pool from "./db.config.js";

export const query = async (sql: string, params: Array<string> = []) => {
  let connection;

  try {
    connection = await pool.getConnection();
    const results = await connection.query(sql, params);
    return results;
  } catch (error) {
    console.error("DB Error", error);
    throw new Error();
  } finally {
    if (connection) {
      connection.release();
    }
  }

}