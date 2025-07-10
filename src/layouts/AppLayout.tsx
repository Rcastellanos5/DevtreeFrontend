
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import NavigationTabs from "../components/NavigationTabs";
import {getUser} from "../api/DevTreeApi"
import DevTree from "../components/DevTree";
export default function AppLayout() {
    //Usa React Query para llamar la funcion getUser y manejar el estado de la peticion 
    const {data, isLoading, isError}=useQuery({
        queryFn: getUser,
        queryKey:['user'],
        retry:2,
        refetchOnWindowFocus:false


    })
 
    if(isLoading)return 'Cargando...'
    if(isError){return<Navigate to={"/auth/login"}/>
        
    }
    console.log(data)




    if (data)return <DevTree data={data}/>
}