import type { Collection, FullBookDTO, SeriesList } from "@shared/types";
import { useForm } from "react-hook-form";

type CreateFullbookFromProps = {
  collectionList: Collection[],
  seriesList: SeriesList[]
}

function CreateFullbookForm({ collectionList, seriesList }: CreateFullbookFromProps){
  
  "use no memory";

  const { register, handleSubmit, reset } = useForm<FullBookDTO>();

  return(
    <form>
      <fieldset className="text-white">
        <legend>&nbsp;Base&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="bookBase.title">Título</label>
          <input
            {...register("bookBase.title", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="bookBase.title"
          />
        </div>

        <div className="input-group">
          <label htmlFor="bookBase.language">Idioma</label>
          <select 
            {...register("bookBase.language", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="bookBase.language">
              <option value="Español">Español</option>
              <option value="Inglés">Inglés</option>
              <option value="Alemán">Alemán</option>
              <option value="Japonés">Japonés</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="bookBase.format">Formato</label>
          <select {...register("bookBase.format", {
            required: true
          })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="bookBase.format">
              <option value="Digital">Digital</option>
              <option value="Impreso">Impreso</option>
              <option value="Ambos">Ambos</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="description">Descripción</label>
          <textarea 
            {...register("bookBase.description")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            id="bookBase.description"/>
        </div>

        <div className="input-group">
          <label htmlFor="bookBase.indexVolume">Volumen</label>
          <input 
            {...register("bookBase.indexVolume")}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="bookBase.indexVolume"/>
        </div>

        <div className="input-group gap-1">
          <label
            htmlFor="bookBase.cover" 
            className="custom-input-file bg-zinc-600 rounded-md text-center">
              Portada
          </label>
          <input
            {...register("bookBase.cover", {
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
            id="bookBase.cover"/>
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
          <label htmlFor="author.name">Nombre</label>
          <input
            {...register("author.name")}
            id="author.name"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
          </input>
        </div>
        <div className="input-group">
          <label htmlFor="author.lastname1">Apellido 1</label>
          <input
            {...register("author.lastname1")}
            id="author.lastname1"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
          </input>
        </div>
        <div className="input-group">
          <label htmlFor="author.lastname2">Apellido 2</label>
          <input
            {...register("author.lastname2")}
            id="author.lastname2"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
          </input>
        </div>
        <div className="input-group">
          <label htmlFor="author.lastname3">Apellido 3</label>
          <input
            {...register("author.lastname3")}
            id="author.lastname3"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
          </input>
        </div>
        {/* <div className="input-group">
          <label htmlFor="author.alias">Alias</label>
          <input
            {...register("author.alias")}
            id="author.alias"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black">
          </input>
        </div> */}
      </fieldset>
      <fieldset className="text-white">
          <legend>&nbsp;Series&nbsp;</legend>
          <div className="input-group">
            <label htmlFor="series.name">Nombre</label>
            <select 
              {...register("series.name")}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="series.name"
              defaultValue={"null"}>
                {seriesList.map((ser) => (
                <option
                  key={ser.id}
                  value={ser.name}>
                    {ser.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className="input-group">
            <label htmlFor="series.volumes">Volúmenes</label>
              <input 
                {...register("series.volumes")}
                className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
                type="number"
                id="series.volumes"/>
          </div> */}

          {/* <div className="input-group">
            <label htmlFor="series.status">Estatus</label>
              <select 
                {...register("series.status", {
                  required: true
                })}
                className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
                id="series.status">
                  <option value="Abierta">Abierta</option>
                  <option value="Cerrada">Cerrada</option>
                  <option value="Desconocido">Desconocido</option>
              </select>
          </div> */}

        </fieldset>
        <fieldset className="text-white">
          <legend>&nbsp;Colección&nbsp;</legend>
          <div className="input-group">
              <label htmlFor="collection.name">Colección</label>
              <select 
                {...register("collection.name", {
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
        </fieldset>
      <button
        type="submit"
        className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
          Actualizar
      </button>
    </form>
  );
};

export default CreateFullbookForm;