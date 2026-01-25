import { MainLayout } from "../../components/layouts";
import { BookCard } from "../../components/ui";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as BookServices from "./../../services/books-services";

function DetailsPage() {
  const [book, setBook] = useState();
  const { id } = useParams();
  
  useEffect(() => {
    const handleDetails = async () => {
      try {
        const book = await BookServices.getDetails(id);
        setBook(book); 
      } catch (error) {
        console.error("Error:", error);
      }
    }
    handleDetails();
  },[id]);
  
  return (
    <MainLayout>
      <section className="DetailPage">
        {book && (<BookCard book={book} />)}
      </section>
    </MainLayout>
  );
}

export default DetailsPage;