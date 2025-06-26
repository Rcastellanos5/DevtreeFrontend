import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
import {isAxiosError} from "axios"
import { toast } from "sonner"
import type { RegisterForm } from "../types"
import ErrorMesagge from "../components/ErrorMesagge"
import api from "../config/axios"
export default function RegisterView(){
    
    const initialvalutes:RegisterForm={
            name:"", 
            email:"",
            handle:"",
            password:"",
            password_confirmation:""

        }



    const {register,watch,handleSubmit, reset,formState:{errors}}=useForm({defaultValues:initialvalutes})
//Register view
//variable para escuchar los que se esta escribiendo en el campo 
const password = watch('password')
console.log("API URL:", import.meta.env.VITE_API_URL);
    const handleRegister =async(formData:RegisterForm)=>{
        try{
           const {data} =await api.post(`/auth/register`, formData);
           toast.success(data)
           reset();

        }
        catch(error){
            if (isAxiosError(error)&& error.response){
                toast.error(error.response.data.error)
                }
            }
        }
    
    return( 
        <>
            <h1 className="text-4xl text-white font-bold">Crear cuenta</h1>
             <nav className="mt-10">
            <form 
    onSubmit={handleSubmit(handleRegister)}
    className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
>   
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
        <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            //Validacion del campo nombre 
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('name',{
                required:"El nombre es requerido"
            })}
        />
        
        {errors.name && <ErrorMesagge>{errors.name.message}</ErrorMesagge>}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
        <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            //validacion del campo email 
            {...register('email'
                ,{required:"El email es requerido",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "E-mail no válido",
                    },
                }
            )}
            
        />
        {errors.email&&<ErrorMesagge>{errors.email.message}</ErrorMesagge>}
    
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
        <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario: sin espacios"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('handle',{required:"El handle es obligatorio"})}
        />
        {errors.handle&&<ErrorMesagge>{errors.handle.message}</ErrorMesagge>}
    </div>
    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
        <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password',{
                required:"La contrseña es requeridad",
                minLength:{
                    value:8,
                    message:"La contraseña debe tener minimo 8 caracteres"                
                }


            })}
        />
        {errors.password&&<ErrorMesagge>{errors.password.message}</ErrorMesagge>}
    </div>

    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
        <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Password"
            //Validacion de el campo repetir password y que sea igual a password 
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password_confirmation',{required:"La contraseña es requerida",
                validate: (values)=> values===password ||"La contraseña debe ser la misma  no son iguales "
            })}
        />
        {errors.password_confirmation&&<ErrorMesagge>{errors.password_confirmation.message}</ErrorMesagge>}
    </div>

    <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Crear Cuenta'
    />  
</form>
            <Link 
                className="text-center text-white text-lg block"
                to="/auth/login">
                ¿Ya tienes cuenta?Inicia sesion 
            </Link>
        </nav>
        </>
        
    )
}