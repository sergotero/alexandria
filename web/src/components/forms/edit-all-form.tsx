import type { Author, Collection, FullBook, SeriesList } from "@shared/types";
import EditAuthorForm from "./edit-forms/edit-author-form.tsx";
import EditBookBaseForm from "./edit-forms/edit-bookbase-form.tsx";
import EditSeriesForm from "./edit-forms/edit-series-form.tsx";
// import EditCollectionForm from "./edit-forms/edit-collection-form";

type EditAllFormProps = {
  fullbook: FullBook,
  collectionList: Collection[],
  seriesList: SeriesList[],
  authorList: Author[],
  updateBook: (id: number) => Promise<void>
}



function EditAllForm({ fullbook, authorList, collectionList, seriesList, updateBook }: EditAllFormProps) {
  return (
    <div>
      {fullbook.bookBase &&
        <EditBookBaseForm 
          fullbook={fullbook}
          updateBook={updateBook}
        />}
      {fullbook.author &&
        <EditAuthorForm 
          fullbook={fullbook}
          updateBook={updateBook}
          authorList={authorList}
        />}
      {fullbook.series && 
        <EditSeriesForm 
          fullbook={fullbook} 
          updateBook={updateBook}
          seriesList={seriesList}
        />}
      {/*{fullbook.collection && <EditCollectionForm fullbook={fullbook} collectionList={collectionList} updateCollection={updatePartialBook}/>} */}
    </div>
  );
}

export default EditAllForm;