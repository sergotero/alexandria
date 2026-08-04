import type { Collection, FullBook, Series } from "@shared/types";
import EditAuthorForm from "./edit-forms/edit-author-form";
import EditBookBaseForm from "./edit-forms/edit-bookbase-form";
import EditCollectionForm from "./edit-forms/edit-collection-form";
import EditSeriesForm from "./edit-forms/edit-series-form";

type EditAllFormProps = {
  fullbook: FullBook,
  collectionList: Collection[],
  seriesList: Series[]
}

function EditAllForm({ fullbook, collectionList, seriesList }: EditAllFormProps) {
  const { bookBase, author, series, collection } = fullbook;
  return (
    <div>
      {bookBase && <EditBookBaseForm bookBase={bookBase}/>}
      {author && <EditAuthorForm author={author}/>}
      {series && <EditSeriesForm series={series} seriesList={seriesList}/>}
      {collection && <EditCollectionForm collection={collection} collectionList={collectionList}/>}
    </div>
  );
}

export default EditAllForm;