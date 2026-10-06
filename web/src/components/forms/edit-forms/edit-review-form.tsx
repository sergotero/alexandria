import type { FullBook, ServerMessage, SimpleReview } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { dateFormatter, isApiError } from "../../../services/utils.services";
import * as ReadBookServices from "./../../../services/readbook.services.js";
import * as FullBookServices from "./../../../services/fullbook.services.js";
import useWarningContext from "../../hooks/useWarningContext.js";

type EditReviewFormProp = {
  details: FullBook,
  setDetails: (data: FullBook) => void,
}

function EditReviewForm({ details, setDetails }: EditReviewFormProp) {
  
  "use no memo";
  
  const { register, reset, handleSubmit } = useForm<SimpleReview>({
    defaultValues: details.review
  });
  const { warning, setWarning } = useWarningContext();
  
  const maxDate = new Date();

  const submit: SubmitHandler<SimpleReview> = async (data: SimpleReview) => {
    try {
      await ReadBookServices.update(details.review.id!, data);
      const response = await FullBookServices.detail(details.bookBase.id!);
      if (response.success) {
        setDetails(response.data);
      }
      reset({
        id: details.review.id,
        score: details.review.score,
        readingDate: dateFormatter(details.review.readingDate, true) as unknown as Date,
        comments: details.review.comments,
        completed: details.review.completed as boolean
      });
      setWarning({
        success: true,
        data: {
          message: "La reseña se ha actualizado de manera exitosa",
          statusCode: 200
        }
      });
    } catch (error) {
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

  useEffect(() => {
    reset({
        id: details.review.id,
        score: details.review.score,
        readingDate: dateFormatter(details.review.readingDate, true) as unknown as Date,
        comments: details.review.comments,
        completed: details.review.completed
      })
  }, [details.review]);

  return (
    <form method="POST" onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend>&nbsp;Reseña&nbsp;</legend>
        <div className="input-group">
          <input
            {...register("id", {
              required: true,
              valueAsNumber: true
            })}
            type="number"
            id="ReviewId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
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
            id="readingDate"
            max={dateFormatter(maxDate, true)}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
          />
        </div>
        <div className="input-group">
          <label htmlFor="score">Puntuación*</label>
          <input
            {...register("score", {
              required: true,
              valueAsNumber: true
            })}
            type="number"
            step={0.01}
            min={0}
            max={10}
            id="score"
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
            Actualizar
        </button>
      </fieldset>
    </form>
  );
}


export default EditReviewForm;