import { useParams } from "react-router";
import { MainLayout } from "../../components/layouts";
import { useEffect } from "react";
import * as BookServices from "./../../services/books-services";

function DetailsPage() {
  const { id } = useParams();

  const [book, setBook] = useState([]);

  useEffect(()=>{
    const handleDetails = async (id) => {
      const details = await BookServices.getDetails(id);
      setBook(details);
    }

    handleDetails();
  },[]);
  
  return (
    <MainLayout>
      
    </MainLayout>
  );
}

export default DetailsPage;