import { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from "recharts";
import * as BookServices from "../../services/books-services";
import * as ReviewServices from "../../services/review-services";

function ProfilePage() {
  // console.log(data);
  // const aaa = (localStorage.getItem("db_reviews"))? localStorage.getItem("db_reviews"): [];
  // data.forEach((d) => aaa.push(d));
  // localStorage.setItem("db_reviews", JSON.stringify(aaa))

  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [booksByCollection, setBooksByCollection] = useState([]);
  const [booksPerMonth, setBooksPerMonth] = useState([]);
  
  useEffect(() => {
    const handleBooksByReviews = async () => {
      // const date = ((new Date()).toLocaleDateString()).split("/");
      // const today = `${date[2]}-${date[1]}-${date[0]}`;
      const filteredBooks = await BookServices.getBooksByYear("2025-01-01", "2025-12-31");
      setBooks(filteredBooks);
    }
    handleBooksByReviews();
    const handleReviews = async () => {
      const storedReviews = await ReviewServices.getUserReviews("2025-01-01", "2025-12-31");
      setReviews(storedReviews);
    }
    handleReviews();
  },[]);

  useEffect(()=> {
    const groupedBooks = books.reduce((counter, book) => {
      const collection = book.coleccion;
      if (counter[collection] === undefined) {
        counter[collection] = 1;
      } else {
        counter[collection]  = counter[collection] + 1;
      }
      return counter;
    },{});

    const data = [];
    for (const key in groupedBooks) {
      const object = {
        cat: key,
        amount: groupedBooks[key]
      }
      data.push(object);
    }
    setBooksByCollection(data);
    

    const monthNames = {
      "01": "Enero", "02": "Febrero", "03": "Marzo", "04": "Abril", "05": "Mayo", "06": "Junio", "07": "Julio", "08": "Agosto", "09": "Septiembre", "10": "Octubre", "11": "Noviembre", "12": "Diciembre"
    };
    const counts = reviews.reduce((counter, review) => {
      const monthKey = review.date.split("-")[1];
      const monthName = monthNames[monthKey];

      if (counter[monthName] === undefined) {
        counter[monthName] = 1;
      } else {
        counter[monthName] += counter[monthName];
      }

      return counter;
    },{});
    const bpm = Object.entries(counts).map(([month, number]) => ({month, number}))
    setBooksPerMonth(bpm);
  },[books, reviews]);

  console.log("Books Month", booksPerMonth);
  console.log("Books Colection ", booksByCollection);
  
  
  return (
    <section className={styles.section}>
      <div>
        <h1>About me</h1>
      </div>
      <div>
        <h1>Favorites</h1>
      </div>
      <div className={styles.statistics}>
        <h1>Statistics</h1>
        <div className={styles.charts}>
          <div>
            {/* Libros por mes */}
            <BarChart 
              width={`100%`}
              height={600}
              maxBarSize={100}
              data={booksPerMonth}
              responsive
            >
              <CartesianGrid 
                vertical={false}
              />
              <XAxis 
                dataKey="month"
                tick={{fontSize: 12, fontWeight: 'bold',}}
                angle={90}
                textAnchor="end"
                height={120}
                tickMargin={50}
              />
              <YAxis />
              <Bar 
                dataKey="number"
                name="libros"
                animationBegin={500}
                animationDuration={2000}
                activeBar={{ fill: "#9E005D" }}
                fill="#00A99D"
              />
              <Tooltip />
              <Legend />
            </BarChart>
          </div>
          <div>
            {/* Libros por colección */}
            <BarChart 
              width={`100%`}
              height={600}
              maxBarSize={100}
              data={booksByCollection}
              responsive
            >
              <CartesianGrid
                vertical={false}
              />
              <XAxis
                dataKey="cat"
                tick={{fontSize: 12, fontWeight: 'bold',}}
                angle={90}
                textAnchor="end"
                height={120}
                tickMargin={50}
              />
              <YAxis />
              <Bar 
                dataKey="amount"
                name="cantidad"
                animationBegin={500}
                animationDuration={2000}
                activeBar={{ fill: "#9E005D" }}
                fill="#00A99D"
              />
              <Tooltip />
              <Legend />
            </BarChart>

          </div>
          <div>

          </div>
          <div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;