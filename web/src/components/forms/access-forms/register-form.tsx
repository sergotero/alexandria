import type { UserDTO } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form"

function RegisterForm(){
  const  { register, handleSubmit, reset } = useForm<UserDTO>();
  const submit: SubmitHandler<UserDTO> = async(data: UserDTO) => {
    console.log(data);
    
  }

  return(
    <form onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend className="text-white">&nbsp;Registro&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="name" className="text-white">Nombre*</label>
          <input 
            {...register("name", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="name"/>
        </div>
        <div className="input-group">
          <label htmlFor="lastname1" className="text-white">1<sup>er</sup> Apellido*</label>
          <input 
            {...register("lastname1", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="lastname1"/>
        </div>
        <div className="input-group">
          <label htmlFor="lastname2" className="text-white">2<sup>do</sup> Apellido*</label>
          <input 
            {...register("lastname2", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="text"
            id="lastname2"/>
        </div>
        <div className="input-group">
          <label htmlFor="email" className="text-white">Email*</label>
          <input 
            {...register("email", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="email"
            id="email"/>
        </div>
        <div className="input-group">
          <label htmlFor="password" className="text-white">Contraseña*</label>
          <input 
            {...register("password", {
              required: true
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="password"
            id="password"/>
        </div>
      </fieldset>
      <button type="submit" className="btn bg-emerald-600 hover:bg-emerald-700 hover:cursor-pointer text-white min-w-24 disabled:bg-zinc-600 rounded">
          Acceder
        </button>
        <p className="inline ms-15 text-white text-center text-xs">Los campos marcados con * son obligatorios</p>
    </form>
  );
}

export default RegisterForm;