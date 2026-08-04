import type { Series } from "@shared/types";

type EditSeriesFormProps = {
  series: Series,
  seriesList: Series[]
};

function EditSeriesForm({ series, seriesList }: EditSeriesFormProps){
  return(
    <form method="POST">
      <legend>Series</legend>
      <fieldset>
        <div className="input-group">
          <label htmlFor="name">Serie</label>
          <select className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" name="collection" id="collection" defaultValue={series.name ?? ""}>
              {seriesList.map((ser) => {
                return <option key={ser.id} value={ser.name!}>{ser.name}</option>
              })}
            </select>
        </div>
        <div className="input-group">
          <label htmlFor="name">Volúmenes</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="volumes" id="volumes" value={series.volumes ?? ""} />
        </div>
        <div className="input-group">
          <label htmlFor="name">Estatus</label>
          <select className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" name="status" id="status" defaultValue={series.volumes ?? ""}>
            <option value=""></option>
            <option value="Abierta">Abierta</option>
            <option value="Cerrada">Cerrada</option>
            <option value="Desconocido">Desconocido</option>
          </select>
        </div>
        <button type="submit" className="btn bg-zinc-600 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  );
}

export default EditSeriesForm;