import type { Collection } from "@shared/types";
import type { URLSearchParamsInit } from "react-router";

type SearchBarProps = {
  collections: Collection[],
  searchType: string,
  setQueryParams: (queryParams: URLSearchParamsInit) => void
};


function SearchBar({ collections, searchType, setQueryParams }: SearchBarProps){
  
  const handleOnChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const type = event.target.value;
    setQueryParams({ type });
  };

  return(
    <div className="input-group max-w-[30%]">
      <select
        className="bg-zinc-400 rounded-bl-xl rounded-tl-xl p-2 ms-1 text-black max-w-[30%] font-bold"
        name="search-type"
        id="search-type"
        onChange={handleOnChange}>
          <option value="title">Título</option>
          <option value="author">Autor</option>
          <option value="collection">Colección</option>
      </select>
      {searchType === "collection" ?
        (<>
          <input 
            className="bg-white rounded-br-xl rounded-tr-xl p-2 ps-2 pe-2 max-w-[70%]" 
            type="text" 
            name="search" 
            id="search" 
            placeholder="Buscar..."
            list="collections"/>
          <datalist id="collections">
            {collections.map((col) => <option value={col.name}>{col.name}</option>)}
          </datalist>
        </>) : (
          <input 
            className="bg-white rounded-br-xl rounded-tr-xl p-2 ps-2 pe-2 max-w-[70%]" 
            type="text" 
            name="search" 
            id="search" 
            placeholder="Buscar..."
          />
        )
      }

    </div>
  );
}

export default SearchBar;