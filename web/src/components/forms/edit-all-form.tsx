import type { Author, Collection, FullBook, Series } from "@shared/types";
import EditAuthorForm from "./edit-forms/edit-author-form";
import EditBookBaseForm from "./edit-forms/edit-bookbase-form";
// import EditCollectionForm from "./edit-forms/edit-collection-form";
// import EditSeriesForm from "./edit-forms/edit-series-form";

type EditAllFormProps = {
  fullbook: FullBook,
  collectionList: Collection[],
  seriesList: Series[],
  authorList: Author[],
  updateBook: (id: number) => void,
}



function EditAllForm({ fullbook, authorList, collectionList, seriesList, updateBook }: EditAllFormProps) {
  return (
    <div>
      {fullbook.bookBase && <EditBookBaseForm fullbook={fullbook} updateBook={updateBook}/>}
      {fullbook.author && <EditAuthorForm fullbook={fullbook} updateBook={updateBook} authorList={authorList}/>}
      {/* {fullbook?.series && <EditSeriesForm fullbook={fullbook} seriesList={seriesList} updateSeries={updatePartialBook}/>}
      {fullbook.collection && <EditCollectionForm fullbook={fullbook} collectionList={collectionList} updateCollection={updatePartialBook}/>} */}
    </div>
  );
}

export default EditAllForm;