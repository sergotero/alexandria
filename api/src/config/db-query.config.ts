import pool from "./db.config.js";

export type SQLValue = string| number| boolean| Date| null;

export const query = async (sql: string, params: Array<SQLValue> = []) => {
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