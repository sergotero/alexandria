import type { Author, Collection, FullBookDTO, SeriesList, ServerMessage } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as FullBookServices from "./../../../services/fullbook.services.js";
import { isApiError } from "../../../services/utils.services.js";

type CreateFullbookFromProps = {
  warning: ServerMessage | null,
  setWarning: (newWarning: ServerMessage | null) => void,
  authorList: Author[],
  collectionList: Collection[],
  seriesList: SeriesList[]
}

function CreateFullbookForm({ authorList, collectionList, seriesList, warning, setWarning }: CreateFullbookFromProps){
  
  "use no memory";

  const { register, handleSubmit, reset } = useForm<FullBookDTO>();

  const submit: SubmitHandler<FullBookDTO> = async(data: FullBookDTO) => {
    console.log("Raw data: ", data);
    
    try {
      await FullBookServices.create(data);
      setWarning({
        success: true,
        data: {
          message: "El libro se ha creado con éxito",
          statusCode: 200
        }
      });
    } catch (error: unknown) {
      if(isApiError(error)){
        setWarning({
          success: error.success,
          data: {
            message: error.error.message,
            statusCode: error.error.statusCode
          }
        });
      }
    }
    reset();
  }

  useEffect(() => {
    let warningTimeout: number;
    if (warning) {
      warningTimeout = setTimeout(() => {
        setWarning(null);
      }, 5000);
    }
    return () => {
      clearTimeout(warningTimeout);
    }
  }, [warning]);

  return(
    <form method="popover" onSubmit={handleSubmit(submit)}>
      <fieldset className="text-white">
        <legend>&nbsp;Base&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="title">Título*</label>
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
          <label htmlFor="language">Idioma*</label>
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
          <label htmlFor="format">Formato*</label>
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
            {...register("indexVolume", {
              valueAsNumber: true
            })}
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
            {...register("cover", {
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
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
              }
            })}
            type="file"
            id="cover"/>
          <input
            type="text"
            name="cover-name"
            id="cover-name"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            readOnly
          />
        </div>
      </fieldset>

      <fieldset className="text-white">
        <legend>&nbsp;Autor&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="authorId">Autor*</label>
          <select
            {...register("authorId",{
              required: true,
              valueAsNumber: true
            })}
            id="authorId"
            defaultValue={0}
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
      </fieldset>

      <fieldset className="text-white">
          <legend>&nbsp;Serie&nbsp;</legend>
          <div className="input-group">
            <label htmlFor="seriesId">Serie</label>
            <select 
              {...register("seriesId", {
                valueAsNumber: true
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="seriesId"
              defaultValue={0}>
                {seriesList.map((ser) => (
                <option
                  key={ser.id}
                  value={ser.id}>
                    {ser.name}
                </option>
              ))}
            </select>
          </div>

        </fieldset>
        <fieldset className="text-white">
          <legend>&nbsp;Colección&nbsp;</legend>
          <div className="input-group">
              <label htmlFor="collectionId">Colección*</label>
              <select 
                {...register("collectionId", {
                  required: true,
                  valueAsNumber: true
                })}
                defaultValue={0}
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
        </fieldset>
      <button
        type="submit"
        className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
          Actualizar
      </button>
      <p className="inline ms-30 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
    </form>
  );
};

export default CreateFullbookForm;