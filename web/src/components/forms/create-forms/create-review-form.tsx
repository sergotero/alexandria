import type { ExtendedReviewDTO, FullBook } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { dateFormatter, isApiError } from "../../../services/utils.services";
import * as ReadBookServices from "./../../../services/readbook.services.js";
import * as FullBookServices from "./../../../services/fullbook.services.js";
import useWarningContext from "../../hooks/useWarningContext.js";

type CreateReviewFormProps = {
  details: FullBook,
  setDetails: (data: FullBook) => void,
}

function CreateReviewForm({ details, setDetails }: CreateReviewFormProps) {
  
  "use no memo";
  
  const { register, reset, handleSubmit } = useForm<ExtendedReviewDTO>();
  const { warning, setWarning, update, setUpdate } = useWarningContext();
  const maxDate = new Date();

  const submit: SubmitHandler<ExtendedReviewDTO> = async (data: ExtendedReviewDTO) => {
    try {
      await ReadBookServices.create(data);
      const response = await FullBookServices.detail(data.bookId);
      if (response.success) {
        setDetails(response.data);
      }
      setWarning({
        success: true,
        data: {
          message: "La reseña se ha creado de manera exitosa",
          statusCode: 200
        }
      });
      reset();
      setUpdate(!update);
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
      <fieldset>
        <legend>&nbsp;Reseña&nbsp;</legend>
        <div className="input-group">
          <input
            {...register("bookId", {
              required: true,
              valueAsNumber: true
            })}
            type="number"
            id="bookId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            value={details.bookBase.id}
            hidden
            readOnly
          />
        </div>
        <div className="input-group">
          <input
            {...register("authorId", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            id="authorId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            value={details.author.id}
            hidden
            readOnly
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="readingDate">Fecha lectura*</label>
          <input
            {...register("readingDate", {
              required: true,
              valueAsDate: true
            })}
            type="date"
            max={dateFormatter(maxDate, true)}
            id="readingDate"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
          />
        </div>
        <div className="input-group">
          <label htmlFor="score">Puntuación*</label>
          <input
            {...register("score", {
              required: true,
              valueAsNumber: true,
            })}
            type="number"
            step={0.01}
            min={0}
            max={10}
            id="ReviewId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
          />
        </div>
        <div className="input-group">
          <label htmlFor="completed">¿Completado?</label>
          <input
            {...register("completed")}
            type="checkbox"
            id="completed"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
          />
        </div>
        <div className="input-group">
          <label htmlFor="comments">Opinión</label>
          <textarea
            {...register("comments")}
            id="comments"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            rows={10}
          ></textarea>
        </div>
        

        <button 
          type="submit" 
          className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
            Añadir
        </button>
      </fieldset>
    </form>
  );
}

export default CreateReviewForm;