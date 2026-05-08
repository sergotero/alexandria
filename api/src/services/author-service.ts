import * as AuthorRepository from "./../repositories/author-repository.js";

//Servicio: se encarga de la lógica de negocio.
export async function getAuthors() {
  const authors = await AuthorRepository.findAll();
  return authors;
}