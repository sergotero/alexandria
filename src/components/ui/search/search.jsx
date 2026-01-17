import "./search.css";

function Search({ search, handleOnChange }) {
  return (
    <div className="Search">
      <input type="text" name="search" id="search" placeholder="Buscar..." onChange={handleOnChange} value={search}/>
      <i className="fas fa-search"></i>
    </div>
  );
}

export default Search;