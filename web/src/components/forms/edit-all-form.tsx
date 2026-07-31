import type { FullBook } from "@shared/types";
import EditAuthorForm from "./edit-forms/edit-author-form";
import EditBookBaseForm from "./edit-forms/edit-bookbase-form";

type EditAllFormProps = {
  fullbook: FullBook,
}

function EditAllForm({ fullbook }: EditAllFormProps) {
  const { bookBase, author, series, collection } = fullbook;
  return (
    <div>
      {bookBase && <EditBookBaseForm bookBase={bookBase}/>}
      {author && <EditAuthorForm author={author}/>}
      {/* {series && <EditAuthorForm author={author}/>}
      {collection && <EditAuthorForm author={author}/>} */}
    </div>
  );
}

export default EditAllForm;