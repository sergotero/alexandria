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

export const transaction = async (sql: string, params: Array<SQLValue> = []) => {
  let connection;

  try {
    connection = await pool.getConnection();
    connection.beginTransaction();
    //TODO: loop for all the queries
    const results = await connection.batch(sql, params);
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