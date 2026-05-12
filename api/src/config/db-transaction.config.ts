import pool from "./db.config.js";
import type { SQLValue } from "./db-query.config.js";


export const transaction = async (sql: string, params: Array<SQLValue> = []) => {
  let connection;

  try {
    connection = await pool.getConnection();
    connection.beginTransaction();
    //TODO: loop for all the queries
    const results = await connection.query(sql, params);
    connection.commit();
    return results;
  } catch (error) {
    if (connection) {
      connection.rollback();
    }
    console.error("DB Error: ", error);
    throw new Error()
  } finally {
    if (connection) {
      connection.release();
    }
  }
}