import type { SQLValue } from "@shared/types";
import pool from "./db.config.js";

export const batch = async (sql: string, params: SQLValue[][] = []): Promise<void> => {
  let connection;

  try {
    connection = await pool.getConnection();
    return await connection.batch(sql, params);
  }catch (error: unknown){
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }

}