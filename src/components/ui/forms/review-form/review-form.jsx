import * as ReviewServices from "../../../../services/review-services";
import { useForm } from "react-hook-form";
import styles from "./review-form.module.css";
import { useParams } from "react-router";

const defaultValues = {
  defaultValues: {
    date: "",
    rate: null,
    review: ""
  },
  mode: "all",
};

function ReviewForm(){

  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm(defaultValues);

  const date = ((new Date()).toLocaleDateString()).split("/");
  const dateFormat = `${date[2]}-${date[1]}-${date[0]}`;

  const handleReview = async (review) => {
    try {
      const response = await ReviewServices.setReview(review, id);
      reset();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleReview)}>
      <fieldset className={styles.fieldset}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="date">Fecha lectura</label>
          <input 
            className={`${styles.input} ${errors.date ? styles.isInvalid : ""}`}
            {...register("date",
            { required: {
                value: true,
                message: "*Es necesario establecer la fecha de lectura"
              }
            },
            { valueAsDate: true}
            )}
            type="date"
            min={"2000-01-01"}
            max={dateFormat}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="rate">Puntuación</label>
          <input 
            className={`${styles.input} ${errors.rate ? styles.isInvalid : ""}`}
            {...register("rate",
              {
                required: {
                  value: true,
                  message: "*Es necesario darle una puntuación al libro"
                }
              },
              { valueAsNumber: true }
            )}
            type="number"
            step={0.01}
            min={0}
            max={10}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="review">Reseña</label>
          <textarea 
            className={`${styles.input} ${errors.textarea ? styles.isInvalid : ""}`} 
            {...register("review",
              {
                required: {
                  value: true,
                  message: "*Es necesario escribir una reseña"
                }
              })}
            placeholder="Escribe aquí tu reseña"
            minLength={30}
          />
        </div>
      </fieldset>
      <button className={styles.button} type="submit">Enviar</button>
    </form>
  );
}

export default ReviewForm;