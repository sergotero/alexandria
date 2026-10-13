import type { UserDTO } from "@shared/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as UserService from "./../../../services/user.services.js";
import { useNavigate } from "react-router";

function LoginForm(){
  const  { register, handleSubmit, reset } = useForm<UserDTO>();
  const navigate = useNavigate();

  const submit: SubmitHandler<UserDTO> = async(data: UserDTO) => {
    console.log(data);
    const user = await UserService.login({email: data.email, password: data.password});
    if (user) {
      //Falta añadir user al contexto.
      navigate("/library");
      reset();
    }
  }

  return(
    <form onSubmit={handleSubmit(submit)}>
      <fieldset>
        <legend className="text-white">&nbsp;Acceso&nbsp;</legend>
        <div className="input-group">
          <label htmlFor="email" className="text-white">Email*</label>
          <input 
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/,
                message: "El email no tiene un formato válido"
              }
            })}
            className="bg-white mb-4 rounded-md p-0.5 ms-1 text-black"
            type="email"
            id="email"/>
        </div>
        <div className="input-group">
          <label htmlFor="password" className="text-white">Contraseña*</label>
          <input 
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,15}$/,
                message:"La contraseña debe contener al menos una minúscula, una mayúscula, un número y un símbolo y debe tener entre 5 y 15 caracteres"
              }
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

export default LoginForm;