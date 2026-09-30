import type { ServerMessage, SimpleReview } from "@shared/types";
import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { dateFormatter, isApiError } from "../../../services/utils.services";
import * as ReadBookServices from "./../../../services/readbook.services.js";

type EditReviewFormProp = {
  review: SimpleReview,
  warning: ServerMessage | null,
  setWarning: (data: ServerMessage | null) => void
}

function EditReviewForm({ review, warning, setWarning }: EditReviewFormProp) {
  
  "use no memo";
  
  const { register, reset, handleSubmit } = useForm<SimpleReview>({
    defaultValues: review
  });
  
  const maxDate = new Date();

  const submit: SubmitHandler<SimpleReview> = async (data: SimpleReview) => {
    console.log("Data: ", data);
    try {
      await ReadBookServices.update(review.id!, data);
      reset({
        id: review.id,
        score: review.score,
        readingDate: dateFormatter(review.readingDate, true) as unknown as Date,
        comments: review.comments,
        completed: review.completed
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
            {...register("id", {
              required: true,
              valueAsNumber: true
            })}
            type="number"
            id="ReviewId"
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            hidden
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
            Actualizar
        </button>
      </fieldset>
    </form>
  );
}


export default EditReviewForm;