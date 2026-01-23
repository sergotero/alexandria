import styles from "./book-data.module.css";

function BookData({ book }) {
  const { coleccion, serie, total_vol, num_vol, paginas, formato, idioma, isbn, editorial } = book;
  return (
    <div className={styles.bookdata}>
      <table>
        <tbody>
          {idioma && (
            <tr>
              <td><i className="fa-solid fa-language"></i> Idioma:</td>
              <td>{idioma}</td>
            </tr>
          )}
          {formato && (
            <tr>
              <td><i class="fa-solid fa-book"></i> Formato:</td>
              <td>{formato}</td>
            </tr>
          )}
          {paginas && (
            <tr>
              <td><i class="fa-solid fa-book-open"></i> Páginas:</td>
              <td>{paginas}</td>
            </tr>
          )}
          <tr>
            <td><i class="fa-solid fa-layer-group"></i> Colección:</td>
            <td>{coleccion}</td>
          </tr>
          {serie && (
            <tr>
              <td><i class="fa-solid fa-circle-nodes"></i> Serie:</td>
              <td>{serie}</td>
            </tr>
          )}
          {total_vol && (
            <tr>
              <td><i class="fa-solid fa-book"></i> Volúmenes:</td>
              <td>{total_vol}</td>
            </tr>
          )}
          {num_vol && (
            <tr>
              <td><i class="fa-solid fa-hashtag"></i> Volumen:</td>
              <td>{num_vol}</td>
            </tr>
          )}
          {isbn && (
            <tr>
              <td><i class="fa-solid fa-barcode"></i> ISBN:</td>
              <td>{isbn}</td>
            </tr>
          )}
          {editorial && (
            <tr>
              <td><i class="fa-regular fa-building"></i> Editorial:</td>
              <td>{editorial}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookData;