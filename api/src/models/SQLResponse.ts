export default interface SQLResponse {
  affectedRows: number,
  insertId?: number,
  warningStatus: number
}