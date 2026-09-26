import type { Collection, ServerMessage } from "@shared/types";
import * as CollectionService from "./../../../services/collection.services.js";
import { useEffect } from "react";
import { isApiError } from "../../../services/utils.services.js";

type EditCollectionsFormProps = {
  collectionList: Collection[],
  setCollectionList: (data: Collection[]) => void,
  warning: ServerMessage | null,
  setWarning: (data: ServerMessage | null) => void
}

function EditCollectionsForm({ collectionList, setCollectionList, warning, setWarning }: EditCollectionsFormProps){

  "use no memory";
  
  const submit = async(event: React.SubmitEvent) => {
    event.preventDefault();
    const collections = document.getElementsByClassName("mod-collections") as HTMLCollection;
    const data: Collection[] = [];

    for (let i = 0; i < collections.length; i++) {
      const node = collections[i];
      const inputNumber = node.children[0] as HTMLInputElement;
      const inputText = node.children[1] as HTMLInputElement;
      const inputColor = node.children[2] as HTMLInputElement;
      data.push({id: +inputNumber.value, name: inputText.value, colorCode: inputColor.value});
    }
    console.log("Data: ", data);
    try {
      await CollectionService.updateAll(data);
      setCollectionList(data);
      setWarning({
        success: true,
        data: {
          message: "Las colecciones se han actualizado con éxito",
          statusCode: 200
        }
      });
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
    <form method="popover" onSubmit={submit}>
      <fieldset className="text-white">
        <legend>Colecciones</legend>
        {collectionList.filter((col) => col.id !== 0).map((col) => {
          return (
            <div key={col.id.toString()} className="input-group mod-collections">
              <input type="number" id={`collectionId_${col.id.toString()}`} value={col.id} hidden/>
              <input 
                className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
                type="text"
                id={`category_${col.id.toString()}`}
                defaultValue={col.name}
              />
              <input 
                defaultValue={col.colorCode}
                className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
                type="color"
                id={`colorCode_${col.id.toString()}`}
              />
            </div>
          )
        })}
      </fieldset>
      <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
        Modificar
      </button>
      {/* <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p> */}
    </form>
  );
}

export default EditCollectionsForm;