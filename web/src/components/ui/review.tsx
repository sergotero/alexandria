import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FullBook, ServerMessage } from "@shared/types";
import { useState } from "react";
import EditReviewForm from "../forms/edit-forms/edit-review-form";
import { dateFormatter } from "../../services/utils.services";
import CreateReviewForm from "../forms/create-forms/create-review-form";

type ReviewProps = {
  details: FullBook,
  setDetails: (data: FullBook) => void
};

function Review({ details, setDetails }: ReviewProps){

  const [ showCreateForm, setShowCreateForm ] = useState<boolean>(false);
  const [ showUpdateForm, setShowUpdateForm ] = useState<boolean>(false);

  if (details.review !== null && details.review.id !== null) {
    return (
      <>
        <div className="flex justify-between">
          <div className="p-2 w-[70%]">
            <div className="">
              <p><b>Fecha: </b> {dateFormatter(details.review.readingDate!)}</p>
              <p><b>Completado: </b> 
                {details.review.completed ?
                <FontAwesomeIcon icon={"check"} color="#007a55" /> :
                <FontAwesomeIcon icon={"x"} color="red" />}
              </p>
            </div>
            <hr className="border-t-0 border-dotted border-1 mt-5 mb-5" />
            <p className="italic text-justify text-sm">{details.review.comments}</p>
          </div>
          <div className="flex flex-col w-[30%]">
            <div className="bg-zinc-900 pt-4 pb-4 ms-4 rounded-2xl">
              <p className="text-center italic text-sm -mt-2">Puntuación</p>
              <h1 className="text-6xl text-center -mt-2">{details.review.score}</h1>
            </div>
            <button
              className="bg-yellow-600 hover:bg-yellow-500 hover:cursor-pointer text-white min-w-24 ms-4 mt-4 rounded-md disabled:bg-zinc-600 disabled:cursor-default"
              type="button"
              onClick={() => setShowUpdateForm(!showUpdateForm)}>
                Modificar
            </button>
          </div>
        </div>
        {showUpdateForm && (
          <EditReviewForm 
            details={details} 
            setDetails={setDetails}
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {!showCreateForm && (
          <div className="flex flex-col gap-5">
            <h1 className="font-extrabold text-3xl text-center">Este libro todavía no tiene una reseña.</h1>
            <button
              className="bg-emerald-600 hover:bg-emerald-500 hover:cursor-pointer text-white min-w-24 rounded-md ps-2 pe-2 disabled:bg-zinc-600 disabled:cursor-default self-center"
              type="button"
              onClick={() => setShowCreateForm(!showCreateForm)}>
                Añadir reseña
            </button>
          </div>
        )}
        {showCreateForm && (
          <CreateReviewForm 
            details={details}
            setDetails={setDetails}
          />
        )}
      </>
    );
  }

}

export default Review