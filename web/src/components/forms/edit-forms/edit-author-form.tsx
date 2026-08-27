import type { Author, BooksAuthorsDTO, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BooksAuthorsServices from "./../../../services/booksauthors.services.tsx";

type EditAuthorFormProps = {
  fullbook: FullBook,
  authorList: Author[],
  updateBook: (id: number) => Promise<void>
}

function EditAuthorForm({ fullbook, authorList, updateBook }: EditAuthorFormProps) {
  
  "use no memo";

  const { register, reset, handleSubmit } = useForm<BooksAuthorsDTO>();
  
  useEffect(() => {
    reset({
      authorId: fullbook.author.id
    });
  }, [fullbook.author.id, reset]);

  const submit: SubmitHandler<BooksAuthorsDTO> = async (data) => {
    const oldBookId = fullbook.bookBase.id.toString();
    const oldAuthorId = fullbook.author.id.toString();
    await BooksAuthorsServices.update(oldBookId, oldAuthorId, {
      bookId: fullbook.bookBase.id,
      authorId: data.authorId
    });
    await updateBook(fullbook.bookBase.id);
  }

  return (
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>&nbsp;Autor&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="authorId">Autor</label>
          <select
            {...register("authorId")}
            id="authorId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
            {authorList.map((author) => (
              <option
                key={author.id}
                value={author.id}>
                  {author.alias}
              </option>
          ))}
          </select>
        </div>

        <button type="submit" className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  );
}

export default EditAuthorForm;