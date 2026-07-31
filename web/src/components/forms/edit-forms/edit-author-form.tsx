import type { Author } from "@shared/types";

type EditAuthorFormProps = {
  author: Author
}

function EditAuthorForm({ author }: EditAuthorFormProps) {
  return (
    <form method="POST">
      <fieldset>
        <legend>&nbsp;Autor&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="name">Nombre</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="name" id="name" value={author.name} />
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 1</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="lastname1" id="lastname1" value={author.lastname1 ?? ""} />
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 2</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="lastname2" id="lastname2" value={author.lastname2 ?? ""} />
        </div>

        <div className="input-group">
          <label htmlFor="name">Apellido 3</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="lastname3" id="lastname1" value={author.lastname3 ?? ""} />
        </div>

        <div className="input-group">
          <label htmlFor="name">Alias</label>
          <input className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" type="text" name="name" id="name" value={author.alias} />
        </div>
        <button type="submit" className="btn bg-zinc-600 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  )
}

export default EditAuthorForm;