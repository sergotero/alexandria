import { useEffect, useState } from "react";
import styles from "./profile-page.module.css";
import { BarChart, Bar, CartesianGrid, Tooltip, XAxis, YAxis, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
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
    const sortedData = data.toSorted((a,b) => a.cat.toLowerCase().localeCompare(b.cat.toLowerCase()));
    
    setBooksByCollection(sortedData);
    

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
    },{
      Enero: undefined,
      Febrero: undefined,
      Marzo: undefined,
      Abril: undefined,
      Mayo: undefined,
      Junio: undefined,
      Julio: undefined,
      Agosto: undefined,
      Septiembre: undefined,
      Octubre: undefined,
      Noviembre: undefined,
      Diciembre: undefined
    });

    const bpm = Object.entries(counts).map(([month, number]) => ({month, number}));
    setBooksPerMonth(bpm);
  },[books, reviews]);

  // console.log("Books Month", booksPerMonth);
  // console.log("Books Colection ", booksByCollection);
  const sortedBooks = booksByCollection.toSorted((book1, book2) => book2.amount - book1.amount);
  const top6 = sortedBooks.slice(0,6);
  
  
  return (
    <section className={styles.section}>
      <div>
        <h1>About me</h1>
      </div>
      <div>
        <h1>Favorites</h1>
      </div>
      <div className={styles.statistics}>
        <h1>Estadísticas</h1>
        <div className={styles.charts}>
          <div className={styles.chart}>
            <h2>Libros por mes</h2>
            <p>Estos son los libros que has leído en el último año agrupados por mes.</p>
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
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid white',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '12px 16px',
                  fontSize: 14,
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: '#00A99D',
                }}
                cursor={{ fill: 'transparent' }}
              />
              <Legend />
            </BarChart>
          </div>
          <div className={styles.chart}>
            <h2>Libros por colección</h2>
            <p>Estos son los libros que has leído en el último año agrupados por colecciones.</p>
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
                name="libros"
                animationBegin={500}
                animationDuration={2000}
                activeBar={{ fill: "#9E005D" }}
                fill="#00A99D"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid white',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '12px 16px',
                  fontSize: 14,
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: '#00A99D',
                }}
                cursor={{ fill: 'transparent' }}
              />
              <Legend />
            </BarChart>

          </div>
          <div className={styles.chart}>
            <h2>Top géneros literarios</h2>
            <p>Estos son los 6 géneros literarios más leídos en tu último año.</p>
            <RadarChart
              width={`100%`}
              height={600}
              responsive
              outerRadius="80%"
              data={top6}
              margin={{
                top: 20,
                left: 20,
                right: 20,
                bottom: 20,
              }}
            >
              <PolarGrid />
              <PolarAngleAxis
                dataKey="cat"
              />
              <PolarRadiusAxis />
              <Radar
                dataKey="amount"
                name="libros"
                stroke="#00A99D"
                fill="#00A99D"
                fillOpacity={0.6}
                animationBegin={500}
                animationDuration={2000}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid white',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '12px 16px',
                  fontSize: 14,
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  marginBottom: 4,
                }}
                itemStyle={{
                  color: '#00A99D',
                }}
                cursor={{ fill: 'transparent' }}
              />
            </RadarChart>
          </div>
          <div className={styles.chart}>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfilePage;