import styles from "./home-page.module.css";
import { MainLayout } from "../../components/layouts";
import { BooksList } from "../../components/ui";
import * as BooksServices from "../../services/books-services";
import { useEffect, useState } from "react";

function HomePage() {
  const [topBooks, setTopBooks] = useState([]);
  
  useEffect(() => {
    const handleBooks = async () => {
      const response = await BooksServices.getBooks();
      // let randomNumbers = [];
      // for (let i = 0; i < 5; i++) {
      //   const num = Math.floor(Math.random() * response.length + 1);
      //   randomNumbers.push(num);
      // }
      // console.log("RandomNumbers: ", randomNumbers);
      
      // const top5 = response.filter((b) => randomNumbers.includes(b.id_libro));
      // setTopBooks(top5);

      //Al haber hecho la modificación del json, ahora hay IDs que no existen (con el código antiguo muchos libros no se mostraban porque ya no estaban)
      const top10 = response.slice(0,10);
      setTopBooks(top10);
    }
    handleBooks();
  },[]);

  return (
    <MainLayout>
      <section className={styles.homepage}>
        <h1>Bienvenidos</h1>
        <p>
          Este es un nuevo rincón diseñado exclusivamente para amantes de la lectura como vosotros. Sabemos que cada libro que abrís es el inicio de una gran aventura, y queremos que este espacio sea el hogar definitivo para todas esas historias que os han marcado el corazón. Aquí, tenéis el control total de tu propia estantería digital. No importa si sois de clásicos eternos, de ciencia ficción trepidante o de ensayos reveladores; en esta aplicación, podréis organizar vuestra biblioteca personal a vuestro ritmo y redescubrir aquellos títulos que hayáis marcado como favoritos siempre que queráis.<br />Pero leer es mucho más que pasar páginas; es reflexionar, sentir y, sobre todo, opinar. Por eso, os invitamos a que dejéis vuestra huella en cada obra que terminéis. Puntuad vuestras lecturas y escribid reseñas con total sinceridad: contadnos qué os hizo vibrar, qué personaje os robó el sueño o qué final os dejó sin palabras. Vuestra perspectiva es única y este es el lugar perfecto para guardarla y ver cómo evoluciona vuestro criterio literario con el paso del tiempo. Así que, poneos cómodos, buscad vuestro rincón favorito de lectura y preparaos para registrar vuestro próximo gran hallazgo. ¡Estamos deseando leer lo que tenéis que decir!
        </p>
        <hr />
        <div className={styles["top-books"]}>
          <h1>TOP 10</h1>
          <p>
            ¡El año literario está que arde! Estos son los 10 títulos que más conversaciones están generando en nuestra comunidad. Desde intrigas que no os dejan dormir hasta historias que te abrazan el alma, estos libros han conquistado las bibliotecas de miles de lectores. ¿Ya habéis leído alguno? Añadidlo a vuestra estantería, dadle una puntuación y compartid vuestra reseña para ayudar a otros a decidir su próxima gran aventura.
          </p>
          {topBooks && <BooksList books={topBooks}  />}
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;