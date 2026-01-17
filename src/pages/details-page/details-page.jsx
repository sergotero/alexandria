import { MainLayout } from "../../components/layouts";
import { BookCard } from "../../components/ui";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import * as BookServices from "./../../services/books-services";

function DetailsPage() {
  const [book, setBook] = useState({});
  const { id } = useParams();
  
  useEffect(() => {
    const handleDetails = async () => {
      try {
        const details = await BookServices.getDetails(id);
        setBook(details[0]); 
      } catch (error) {
        console.error("Error:", error);
      }
    }
    handleDetails();
  },[]);
  
  return (
    <MainLayout>
      <section className="DetailPage">
        {book && (<BookCard book={book} />)}
      </section>
    </MainLayout>
  );
}

export default DetailsPage;