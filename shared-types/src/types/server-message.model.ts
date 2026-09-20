export type ServerMessage = {
  success: boolean,
  data: {
    message: string,
    statusCode: number,
  }
};