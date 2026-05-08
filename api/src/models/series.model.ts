type States = "Abierta" | "Cerrada" | "Desconocido";

export default interface Series{
  id: number;
  name: string;
  volumes?: number;
  status: States;
}