import { isAxiosError } from "axios";
import api from "../config/axios";
import type { Profileform, User } from "../types";
//Hace una peticion GET a User
export async function getUser(){
    //Si la respuesta es exitosa guarda la respuesta y la imprime
   
    try{

        const{data}=await api<User>('/user')
        return data
    //Si la respuesta es incorrecta se manda un error 
    }catch(error){
       if(isAxiosError (error)&&error.response){
        throw new Error(error.response.data.error)
       } 
    }
}

export async function updateUser(formData:Profileform){
    //Si la respuesta es exitosa guarda la respuesta y la imprime
   
    try{

        const{data}=await api.patch<String>('/user', formData)
        console.log(data)
        return data
    //Si la respuesta es incorrecta se manda un error 
    }catch(error){
       if(isAxiosError (error)&&error.response){
      
        throw new Error(error.response.data.error)
        
    } 
    }
}