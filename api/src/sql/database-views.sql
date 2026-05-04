CREATE VIEW catalogo AS
SELECT librosautores.id_autor AS id_autor,
  librosautores.id_libro AS id_libro,
  series.id AS id_serie,
  colecciones.id AS id_coleccion,
  autores.alias AS autor,
  libros.titulo AS titulo,
  series.nombre AS serie,
  librosseries.index_serie AS Nº,
  colecciones.nombre AS coleccion
FROM autores
  LEFT JOIN librosautores ON autores.id = librosautores.id_autor
  LEFT JOIN libros ON librosautores.id_libro = libros.id
  LEFT JOIN librosseries ON librosseries.id_libro = libros.id
  LEFT JOIN series ON series.id = librosseries.id_serie
  LEFT JOIN libroscolecciones ON libroscolecciones.id_libro = libros.id
  LEFT JOIN colecciones ON colecciones.id = libroscolecciones.id_coleccion
ORDER BY autor,
  serie,
  Nº,
  coleccion;


CREATE VIEW lecturas AS
SELECT librosleidos.id AS id,
  librosleidos.id_libro AS id_libro,
  librosleidos.id_autor AS id_autor,
  libros.titulo AS titulo,
  autores.alias AS autor,
  librosleidos.f_lectura AS f_lectura,
  librosleidos.puntuacion AS puntuacion,
  librosleidos.comentario AS comentario
FROM librosleidos
  JOIN libros ON libros.id = librosleidos.id_libro
  JOIN autores ON autores.id = librosleidos.id_autor
ORDER BY alias,
  titulo,
  f_lectura;


CREATE VIEW catalogo_completo AS
SELECT librosautores.id_autor AS id_autor,
  librosautores.id_libro AS id_libro,
  series.id AS id_serie,
  colecciones.id AS id_coleccion,
  autores.alias AS autor,
  libros.titulo AS titulo,
  librosautores.descripcion AS descripcion,
  libros.idioma AS idioma,
  libros.formato AS formato,
  series.nombre AS serie,
  librosseries.index_serie AS Nº,
  series.total_vol AS total_vol,
  series.estado AS estado,
  colecciones.nombre AS coleccion
FROM autores
  LEFT JOIN librosautores ON autores.id = librosautores.id_autor
  LEFT JOIN libros ON librosautores.id_libro = libros.id
  LEFT JOIN librosseries ON librosseries.id_libro = libros.id
  LEFT JOIN series ON series.id = librosseries.id_serie
  LEFT JOIN libroscolecciones ON libroscolecciones.id_libro = libros.id
  LEFT JOIN colecciones ON colecciones.id = libroscolecciones.id_coleccion
ORDER BY autor,
  serie,
  Nº,
  coleccion;