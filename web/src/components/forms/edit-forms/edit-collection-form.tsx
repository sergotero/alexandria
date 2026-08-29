import type { BooksCollectionsDTO, Collection, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BooksCollectionsService from "./../../../services/bookscollections.services.tsx";

type EditCollectionFormProps = {
  fullbook: FullBook,
  collectionList: Collection[],
  updateBook: (id: number) => void
};

function EditCollectionForm({ fullbook, collectionList, updateBook }: EditCollectionFormProps) {

  "use no memo";

  const { register, handleSubmit, reset } = useForm<BooksCollectionsDTO>();

  useEffect(() => {
    reset({
      collectionId: fullbook.collection.id
    });
  }, [fullbook.collection.id, reset]);

  const submit: SubmitHandler<BooksCollectionsDTO> = async(data: BooksCollectionsDTO) => {
    await BooksCollectionsService.update(fullbook.bookBase.id.toString(), fullbook.collection.id.toString(), {
      bookId: fullbook.bookBase.id,
      collectionId: data.collectionId
    });
    updateBook(fullbook.bookBase.id);
  }

  return(
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <legend>Colección</legend>
      <fieldset>
        <div className="input-group">
            <label htmlFor="collectionId">Colección</label>
            <select 
              {...register("collectionId", {
                required: true
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="collectionId">
              {collectionList.map((col) => (
                <option
                  key={col.id}
                  value={col.id}>
                    {col.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit" 
            className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
              Actualizar
          </button>
      </fieldset>
    </form>
  )
}

export default EditCollectionForm;