type States = "Abierta" | "Cerrada" | "Desconocido";

export default interface Series{
  id?: number | null;
  name: string | null;
  volumes: number | null;
  status: States | null;
}