import "./top-books-list.css";

function TopBooksList({ topBooks }) {
    
  return (
    <div className="TopBookList">
      <h1>TOP 5</h1>
      {topBooks.map((book)=>{
        return (
          <div className="cover">
            <img src={book.portada_url} alt={book.titulo} />
          </div>
        );
      })}
    </div>
  );
}

export default TopBooksList;