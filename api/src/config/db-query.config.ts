import type { SQLValue } from "@shared/types";
import pool from "./db.config.js";

export const query = async (sql: string, params: Array<SQLValue> = []) => {
  let connection;

  try {
    connection = await pool.getConnection();
    return await connection.query(sql, params);
  } catch (error: unknown) {
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }

}