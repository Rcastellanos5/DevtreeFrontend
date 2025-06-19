import { Link } from "react-router-dom"
import {useForm} from 'react-hook-form'
import ErrorMesagge from "../components/ErrorMesagge"
// the diferents components are initialized
 const initialvalutes={
            name:"", 
            email:"",
            handle:"",
            password:"",
            password_confirmation:""

        }
export default function RegisterView(){
    const {register,watch,handleSubmit, formState:{errors}}=useForm({defaultValues:initialvalutes})
//Register view
    const handleRegister =()=>{


       
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
            {...register('email'
                ,{required:"El email es requerido"

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
            {...register('password',{required:"La contrseña es reaueridad"})}
        />
        {errors.password&&<ErrorMesagge>{errors.password.message}</ErrorMesagge>}
    </div>

    <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
        <input
            id="password"
            type="password"
            placeholder="Repetir Password"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register('password',{required:"La contraseña es requerida"})}
        />
        {errors.password&&<ErrorMesagge>{errors.password.message}</ErrorMesagge>}
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