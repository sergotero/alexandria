import type { BookBase } from "@shared/types";

type EditBookBaseFormProps = {
  bookBase: BookBase
};

function EditBookBaseForm({ bookBase }: EditBookBaseFormProps) {
  return(
    <form method="POST">
      <fieldset>
        <legend>&nbsp;Base&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="title">Título</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="title" id="title" value={bookBase.title} />
        </div>

        <div className="input-group">
          <label htmlFor="language">Idioma</label>
          <select className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" name="languages" id="languages" defaultValue={bookBase.language}>
            <option value="Español">Español</option>
            <option value="Inglés">Inglés</option>
            <option value="Alemán">Alemán</option>
            <option value="Japonés">Japonés</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="formats">Formato</label>
          <select className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" name="formats" id="formats" defaultValue={bookBase.format}>
            <option value="Digital">Digital</option>
            <option value="Impreso">Impreso</option>
            <option value="Ambos">Ambos</option>
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="description">Descripción</label>
          <textarea name="description" id="description" defaultValue={bookBase?.description ?? ""}/>
        </div>

        <div className="input-group">
          <label htmlFor="index-volume">Índex volumen</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="index-volume" id="index-volume" value={bookBase?.indexVolume ?? ""} />
        </div>

        <div className="input-group">
          <label htmlFor="cover">Cover URL</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="cover" id="cover" value={bookBase?.cover ?? ""} />
        </div>
        
        <div className="input-group">
          <label htmlFor="cloudinaryID">Cloudinary ID</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="cloudinaryID" id="cloudinaryID" value={bookBase?.cloudinaryId ?? ""} />
        </div>

        <button type="submit" className="btn bg-zinc-600 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  );
}

export default EditBookBaseForm;