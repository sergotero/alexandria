import type { BooksSeriesDTO, FullBook, SeriesList } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BooksSeriesServices from "./../../../services/booksseries.services.tsx";

type EditSeriesFormProps = {
  fullbook: FullBook,
  seriesList: SeriesList[],
  updateBook: (id: number) => void
};

function EditSeriesForm({ fullbook, seriesList, updateBook }: EditSeriesFormProps){

  "use no memo";

  const { register, reset, handleSubmit } = useForm<BooksSeriesDTO>();
  
    useEffect(() => {
      reset({
        seriesId: fullbook.series.id ?? 0,
      });
    }, [fullbook.series, reset]);
  
    const submit: SubmitHandler<BooksSeriesDTO> = async (data: BooksSeriesDTO) => {
      console.log(data);
      
      if (typeof data.seriesId === "string" && data.seriesId === "0" && fullbook.series.id !== null) {
        await BooksSeriesServices.destroy({bookId: fullbook.bookBase.id, seriesId: fullbook.series.id});
      } else {
        let oldSeriesId: null | undefined | string;
        if (fullbook.series.id === null) {
          oldSeriesId = null;
        } else if (fullbook.series.id === undefined) {
          oldSeriesId = undefined;
        } else {
          oldSeriesId = fullbook.series.id.toString();
        }
        await BooksSeriesServices.update(fullbook.bookBase.id.toString(), oldSeriesId, {
          bookId: fullbook.bookBase.id,
          seriesId: data.seriesId
        });
      }
      updateBook(fullbook.bookBase.id);
    }
  
    return (
      <form method="POST" onSubmit={handleSubmit(submit)}>
        <fieldset>
          <legend>&nbsp;Series&nbsp;</legend>
          <div className="input-group">
            <label htmlFor="seriesId">Serie</label>
            <select
              {...register("seriesId")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="seriesId">
              {seriesList.map((series) => (
                <option
                  key={series.id}
                  value={series.id}>
                    {series.name}
                </option>
            ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
              Actualizar
          </button>
        </fieldset>
      </form>
    );
}

export default EditSeriesForm;