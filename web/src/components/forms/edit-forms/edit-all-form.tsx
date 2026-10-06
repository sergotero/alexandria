import type { Author, Collection, FullBook, SeriesList } from "@shared/types";
import EditAuthorForm from "./edit-author-form.tsx";
import EditBookBaseForm from "./edit-bookbase-form.tsx";
import EditSeriesForm from "./edit-series-form.tsx";
import EditCollectionForm from "./edit-collection-form.tsx";

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
      {fullbook.collection && 
        <EditCollectionForm 
          fullbook={fullbook} 
          updateBook={updateBook}
          collectionList={collectionList}
        />}
    </div>
  );
}

export default EditAllForm;