import { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend } from "recharts";
import * as BookServices from "../../services/books-services";
// import data from "../../data/reviews.json";

function ProfilePage() {
  // console.log(data);
  // const aaa = (localStorage.getItem("db_reviews"))? localStorage.getItem("db_reviews"): [];
  // data.forEach((d) => aaa.push(d));
  // localStorage.setItem("db_reviews", JSON.stringify(aaa))

  const [books, setBooks] = useState([]);
  const [booksByCollection, setBooksByCollection] = useState([]);
  
  useEffect(() => {
    const handleReviews = async () => {
      const date = ((new Date()).toLocaleDateString()).split("/");
      const today = `${date[2]}-${date[1]}-${date[0]}`;
      const filteredBooks = await BookServices.getBooksByYear("2025-1-1", today);
      setBooks(filteredBooks);
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
  },[books]);

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
        <BarChart className={styles.barchart} responsive data={booksByCollection ? booksByCollection : []}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="cat" />
          <YAxis dataKey="amount" />
          {booksByCollection?.map((book, index) => <Bar key={index} dataKey={book.cat} activeBar={{ fill: "#9E005D" }} fill="#00A99D" />)}
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    </section>
  );
}

export default ProfilePage;