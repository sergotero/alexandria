import type { BookBaseDTO, FullBook } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as BaseBookService from "./../../../services/basebook.services.tsx";
import { useEffect } from "react";

type EditBookBaseFormProps = {
  fullbook: FullBook,
  updateBook: (id: number) => Promise<void>
};

type BookBaseForm = {
  title: string;
  language: string;
  format: string;
  description: string | null;
  indexVolume: number | null;
  cover?: FileList;
};

function EditBookBaseForm({ fullbook, updateBook }: EditBookBaseFormProps) {

  /*
  Use no memo is necessary due to a incompatibility between RHF, React 19 and reset() and useEffect(). It tells the compiler not to store this component in the memory (which is the cause of the desynchronization). The sentence must be located at the beginning of the component.

  Since the problem is not resolved yet, the solution relies on using this sentence or the hook useWatch to make the <form> reactive.
  */

  "use no memo";

  const { register, handleSubmit, reset } = useForm<BookBaseForm>();

  useEffect(() => {
    reset({
      title: fullbook.bookBase.title,
      language: fullbook.bookBase.language,
      format: fullbook.bookBase.format,
      description: fullbook.bookBase.description,
      indexVolume: fullbook.bookBase.indexVolume,
    });

    const coverName = document.getElementById("cover-name") as HTMLInputElement;
    if (coverName !== null) {
      coverName.value = "";
    }
  }, [fullbook.bookBase, reset]);

  
  const submit: SubmitHandler<BookBaseForm> = async (data: BookBaseForm) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("language", data.language);
    formData.append("format", data.format);
    if (data.description !== null && data.description !== undefined) {
      formData.append("description", data.description);
    }
    if (data.indexVolume !== null && data.indexVolume !== undefined) {
      formData.append("indexVolume", data.indexVolume?.toString());
    }

    if (data.cover !== undefined && data.cover.length !== 0) {
      formData.append("cover", data.cover[0]);
    }
    console.log("FormData", data);
    
    await BaseBookService.update(fullbook.bookBase.id, formData);
    await updateBook(fullbook.bookBase.id);
  }

  return(
    <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
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
            {...register("description", {
              onChange: (event) => {
                console.log("ONCHANGE", event.target.value);
                
              }
            })}
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

        <div className="input-group gap-1">
          <label
            htmlFor="cover" 
            className="custom-input-file bg-zinc-600 rounded-md text-center">
              Portada
          </label>
          <input
            {...register("cover")}
            type="file"
            id="cover"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files !== null) {
                const files: FileList = event.target.files;
                if (files.length !== 0) {
                  const file = event.target.files[0];
                  const coverName = document.getElementById("cover-name") as HTMLInputElement;
                  if (coverName !== null) {
                    coverName.value = file.name;
                  }
                }
              }
            }}/>
          <input
            type="text"
            name="cover-name"
            id="cover-name"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            readOnly
          />
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