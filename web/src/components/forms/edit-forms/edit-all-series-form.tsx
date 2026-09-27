import type { SeriesList, ServerMessage } from "@shared/types";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as SeriesServices from "./../../../services/series.services.js";
import { isApiError } from "../../../services/utils.services.js";

type EditAllSeriesFormProps = {
  seriesList: SeriesList[],
  setSeriesList: (data: SeriesList[]) => void,
  warning: ServerMessage | null,
  setWarning: (data: ServerMessage | null) => void
};

function EditAllSeriesForm({ seriesList, setSeriesList, warning, setWarning }: EditAllSeriesFormProps){

  "use no memo";

  const { register, reset, handleSubmit } = useForm<SeriesList>();
  const [ selectedSeries, setSelectedSeries ] = useState<SeriesList | null>(null);
  
    useEffect(() => {
      reset({
        id: selectedSeries?.id,
        name: selectedSeries?.name,
        status: selectedSeries?.status,
        volumes: selectedSeries?.volumes
      });
    }, [reset, selectedSeries]);
  
    const submit: SubmitHandler<SeriesList> = async (data: SeriesList) => {
      try {
        await SeriesServices.update(data.id, data);
        setWarning({
          success: true,
          data: {
            message: "La serie se ha actualizado con éxito",
            statusCode: 200
          }
        });
        const series = await SeriesServices.list();
        if (series.success) {
          setSeriesList(series.data);
        }
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
  
    return (
      <form method="POST" onSubmit={handleSubmit(submit)}>
        <fieldset className="text-white">
          <legend>&nbsp;Series&nbsp;</legend>
          <div className="input-group">
            <label htmlFor="id">Serie</label>
            <select
              {...register("id", {
                required: true,
                valueAsNumber: true,
                onChange: async (event) => {
                  const id = +event.target.value;
                  const serie = await SeriesServices.detail(id);
                  if (serie.success) {
                    setSelectedSeries(serie.data);
                  }
                }
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="id">
              {seriesList.map((series) => (
                <option
                  key={series.id}
                  value={series.id}>
                    {series.name}
                </option>
            ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="name">Nombre*</label>
            <input 
              {...register("name", {
                required: true,
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="text"
              id="name"
              defaultValue={selectedSeries?.name}/>
          </div>

          <div className="input-group">
            <label htmlFor="volumes">Volúmenes*</label>
            <input 
              {...register("volumes", {
                required: true,
                valueAsNumber: true
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              type="number"
              id="volumes"
              defaultValue={selectedSeries?.volumes}/>
          </div>

          <div className="input-group">
            <label htmlFor="status">Estatus*</label>
            <select
              {...register("status", {
                required: true
              })}
              className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
              id="status"
              defaultValue={selectedSeries?.status}>
                <option value="Abierta">Abierta</option>
                <option value="Cerrada">Cerrada</option>
                <option value="Desconocido">Desconocido</option>
            </select>
          </div>
          <button
            type="submit"
            className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
              Actualizar
          </button>
          <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
        </fieldset>
      </form>
    );
}

export default EditAllSeriesForm;