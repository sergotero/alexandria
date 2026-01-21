import { useForm } from "react-hook-form";
import * as ReviewServices from "../../../../services/review-services";
import styles from "./review-form.module.css";
import { useAuth } from "../../../context";

const defaultValues = {
  defaultValues: {
    date: "",
    rate: null,
    review: ""
  },
  mode: "all",
};

function ReviewForm(){
  const { user } = useAuth();
  
  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors, isValid }
  } = useForm(defaultValues);

  const date = ((new Date()).toLocaleDateString()).split("/");
  const dateFormat = `${date[2]}-${date[1]}-${date[0]}`;


  const handleReview = async (review) => {
    const response = await ReviewServices.setReview({ review, user });
    console.log(response);
    
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleReview)}>
      <fieldset className={styles.fieldset}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="date">Finishing date</label>
          <input 
            className={`${styles.input} ${errors.date ? styles.isInvalid : ""}`}
            {...register("date",
            { required: {
                value: true,
                message: "*It's necessary to stablish the date"
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
          <label className={styles.label} htmlFor="rate">Score</label>
          <input 
            className={`${styles.input} ${errors.rate ? styles.isInvalid : ""}`}
            {...register("rate",
              {
                required: {
                  value: true,
                  message: "*It's necessary to rate the book"
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
          <label className={styles.label} htmlFor="review">Review</label>
          <textarea 
            className={`${styles.input} ${errors.textarea ? styles.isInvalid : ""}`} 
            {...register("review",
              {
                required: {
                  value: true,
                  message: "*It's necessary to write a review"
                }
              })}
            placeholder="Write here your review"
            minLength={30}
          />
        </div>
      </fieldset>
      <button className={styles.button} type="submit">Enviar</button>
    </form>
  );
}

export default ReviewForm;