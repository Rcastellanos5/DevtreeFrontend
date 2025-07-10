import {useForm} from 'react-hook-form'
import{toast} from'sonner'
import ErrorMesagge from '../components/ErrorMesagge'
import {useQueryClient, useIsMutating, useMutation} from '@tanstack/react-query'
import type {User, Profileform} from '../types'
import { updateUser } from '../api/DevTreeApi'
export default function ProfileView() {
    //Se recupera el usuario actual del cache
    const queryClient=useQueryClient()
    const data: User=queryClient.getQueryData(['user'])!
    //Se utilizan los datos como valores por defecto
    const{register, handleSubmit,formState:{errors} }=useForm({defaultValues:{
        handle:data.handle, 
        descripcion:data?.descripcion
    }})
    //Se actualiza el perfil 
    const updateProfileForm =useMutation({
        mutationFn: updateUser,
        //Si todo esta bien le muestra un mensaje de comprobacion al usuario 
        onError:(error)=>{
            toast.error(error.message)
        },
        //Si esta mal muestra un mensaje de error
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['user']})
    }})
    const handleChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){
            console.log(e.target.files[0])
        }
        
    }

    const handlesuserProfileForm =(formData:Profileform)=>{
       
        updateProfileForm.mutate(formData)
    }
    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handlesuserProfileForm)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register('handle',{
                        required:"El nombre del usuario es obligatorio"
                    })}
                />
                {errors.handle&&<ErrorMesagge>{errors.handle.message}</ErrorMesagge>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="description"
                >Descripción:</label>
                <textarea
                    className="border-none bg-slate-100 rounded-lg p-2"
                    placeholder="Tu Descripción"
                    {...register('descripcion',{
                        required:"La descripcion es obligatoria"
                    })}
                />
                {errors.descripcion&&<ErrorMesagge>{errors.descripcion.message}</ErrorMesagge>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label
                    htmlFor="handle"
                >Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="handle"
                    className="border-none bg-slate-100 rounded-lg p-2"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>

            <input
                type="submit"
                className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}