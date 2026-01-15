import "./home-page.css";
import { MainLayout } from "../../components/layouts";
import { TopBooksList } from "../../components/ui";
import * as BooksServices from "../../services/books-services";

function HomePage() {

  const allBooks = BooksServices.getBooks();
  
  let randomNumbers = [];
  for (let i = 0; i < 5; i++) {
    const num = Math.floor(Math.random() * (1451 - 1) + 1);
    randomNumbers.push(num);
  }
  let topBooks = allBooks.filter((b) => randomNumbers.includes(b.id_libro));

  return (
    <MainLayout>
      <div className="HomePage">
        <h1>Bienvenidos</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas at maiores neque! Ducimus, unde dolor sint excepturi fugit facere non laborum aperiam in, architecto culpa ad, dolores magni ullam hic? Sequi et architecto eum repellendus aliquam nemo labore nihil, tenetur tempore amet! Ratione non, nesciunt animi exercitationem perspiciatis deleniti repellendus officiis at mollitia eos, sint, deserunt obcaecati inventore quod pariatur. Ut, eligendi culpa! Aperiam iure ratione quaerat nihil expedita alias corrupti iusto impedit, rerum atque. Ad id porro explicabo possimus, pariatur reiciendis nihil itaque exercitationem voluptatibus. Dolores quisquam fuga earum.</p>
      </div>
      <hr />
      <TopBooksList topBooks={topBooks} />
    </MainLayout>
  );
}

export default HomePage;