import type { Collection } from "@shared/types";

type EditCollectionFormProps = {
  collection: Collection,
  collectionList: Collection[]
};

function EditCollectionForm({ collection, collectionList }: EditCollectionFormProps) {

  return(
    <form method="POST">
      <legend>Colección</legend>
      <fieldset>
        <div className="input-group">
            <label htmlFor="name">Colección</label>
            <select className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black" name="collection" id="collection" defaultValue={collection.name}>
              {collectionList.map((col) => {
                return <option key={col.id} value={col.name}>{col.name}</option>
              })}
            </select>
          </div>
          <button type="submit" className="btn bg-zinc-600 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">Actualizar</button>
      </fieldset>
    </form>
  )
}

export default EditCollectionForm;