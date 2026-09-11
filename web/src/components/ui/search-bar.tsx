type SearchBarProps = {
  searchType: string;
  searchValue: string;
  handleSearchType: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearchValue: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSearchTerm: (event: React.KeyboardEvent) => void;
};


function SearchBar({ searchType, searchValue, handleSearchType, handleSearchValue, handleSearchTerm}: SearchBarProps) {
  return (
    <div className="input-group max-w-[30%]">
      <select
        className="bg-zinc-400 rounded-bl-xl rounded-tl-xl p-2 ms-1 text-black max-w-[30%] font-bold"
        name="search-type"
        id="search-type"
        value={searchType}
        onChange={handleSearchType}
      >
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="collection">Colección</option>
        <option value="series">Serie</option>
      </select>

      {searchType && (
        <input
          className="bg-white rounded-br-xl rounded-tr-xl p-2 ps-2 pe-2 max-w-[70%]"
          type="text"
          name="search"
          id="search"
          placeholder="Buscar..."
          value={searchValue}
          onChange={handleSearchValue}
          onKeyDown={handleSearchTerm}
        />
      )}

    </div>
  );
}

export default SearchBar;