import { type FullBook } from "@shared/types";

type EditFormProps = {
  fullbook: FullBook| null
}

function EditForm({ fullbook }: EditFormProps) {
  return (
    <form action="PATCH">
      <fieldset >
        <legend>Autor</legend>
        <label htmlFor="name">Nombre</label>
        <input placeholder="" className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="name" id="name" value={fullbook?.author.name} />
        <br />
        <label htmlFor="lastname">Apellido</label>
        <input placeholder="" className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="lastname" id="lastname" value={fullbook?.author.lastname1!} />
        <br />
        <label htmlFor="title">Título</label>
        <input placeholder="" className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="title" id="title" value={fullbook?.bookBase.title} />
        <br />
        <label htmlFor="series">Serie</label>
        <input placeholder="" className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="series" id="series" value={fullbook?.series?.name!} />
        <br />
      </fieldset>
    </form>
  );
}

export default EditForm;