import "./home-page.css";
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
      const top5 = response.slice(0,5);
      setTopBooks(top5);
    }
    handleBooks();
  },[]);

  return (
    <MainLayout>
      <section className="HomePage">
        <h1>Bienvenidos</h1>
        <p>
          Es un placer recibirte en este nuevo rincón diseñado exclusivamente para amantes de la lectura como tú. Sabemos que cada libro que abres es el inicio de una gran aventura, y queremos que este espacio sea el hogar definitivo para todas esas historias que te han marcado el corazón. Aquí, tú tienes el control total de tu propia estantería digital. No importa si eres de clásicos eternos, de ciencia ficción trepidante o de ensayos reveladores; en esta aplicación, podrás organizar tu biblioteca personal a tu ritmo y redescubrir tus títulos favoritos siempre que quieras.<br />Pero leer es mucho más que pasar páginas; es reflexionar, sentir y, sobre todo, opinar. Por eso, te invitamos a que dejes tu huella en cada obra que termines. Puntúa tus lecturas y escribe reseñas con total sinceridad: cuéntanos qué te hizo vibrar, qué personaje te robó el sueño o qué final te dejó sin palabras. Tu perspectiva es única y este es el lugar perfecto para guardarla y ver cómo evoluciona tu criterio literario con el paso del tiempo. Así que, ponte cómodo, busca tu rincón favorito de lectura y prepárate para registrar tu próximo gran hallazgo. ¡Estamos deseando leer lo que tienes que decir!
        </p>
        <hr />
        <div className="top-books">
          <h1>TOP 5</h1>
          <p>
            ¡El año literario está que arde! Estos son los 5 títulos que más conversaciones están generando en nuestra comunidad. Desde intrigas que no te dejan dormir hasta historias que te abrazan el alma, estos libros han conquistado las bibliotecas de miles de lectores. ¿Ya has leído alguno? Añádelo a tu estantería, dale tu puntuación y comparte tu reseña para ayudar a otros a decidir su próxima gran aventura.
          </p>
          {topBooks && <BooksList books={topBooks} />}
        </div>
      </section>
    </MainLayout>
  );
}

export default HomePage;