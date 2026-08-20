import type { BookBaseDTO, FullBook } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BaseBookService from "./../../../services/basebook.services.tsx";
import { useEffect } from "react";

type EditBookBaseFormProps = {
  fullbook: FullBook,
  updateBook: (id: number) => void
};

function EditBookBaseForm({ fullbook, updateBook }: EditBookBaseFormProps) {

  const { register, handleSubmit, reset } = useForm<BookBaseDTO>();
  
  useEffect(() => {
    reset({
      title: fullbook.bookBase.title,
      language: fullbook.bookBase.language,
      format: fullbook.bookBase.format,
      description: fullbook.bookBase.description,
      indexVolume: fullbook.bookBase.indexVolume,
      cover: fullbook.bookBase.cover,
      cloudinaryId: fullbook.bookBase.cloudinaryId
    });
  }, [fullbook, reset]);

  const submit: SubmitHandler<BookBaseDTO> = async (data) => {
    await BaseBookService.update(fullbook.bookBase.id, data);
    updateBook(fullbook.bookBase.id);
  }

  return(
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>&nbsp;Base&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="title">Título</label>
          <input
            {...register("title", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="language">Idioma</label>
          <select 
            {...register("language", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="language">
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Alemán">Alemán</option>
              <option value="Japonés">Japonés</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="format">Formato</label>
          <select {...register("format", {
            required: true
          })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="format">
              <option value="Digital">Digital</option>
              <option value="Impreso">Impreso</option>
              <option value="Ambos">Ambos</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="description">Descripción</label>
          <textarea 
            {...register("description")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="description"/>
        </div>

        <div className="input-group">
          <label htmlFor="indexVolume">Volumen</label>
          <input 
            {...register("indexVolume")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="indexVolume"/>
        </div>

        <div className="input-group">
          <label htmlFor="cover">Cover URL</label>
          <input
            {...register("cover")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="cover"/>
        </div>
        
        <div className="input-group">
          <label htmlFor="cloudinaryId">Public ID</label>
          <input
            {...register("cloudinaryId")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="cloudinaryId"/>
        </div>

        <button
          type="submit"
          className="btn bg-green-600 hover:bg-green-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
            Actualizar
        </button>
      </fieldset>
    </form>
  );
}

export default EditBookBaseForm;