

//Estructura para el modelo usuario 
export type User = {
    handle: string
    name: string
    email:string
    password:string
}
//Se utiliza pick para seleccionar una cantida especifica de datod
export type RegisterForm =Pick<User, 'handle'|'email'|'name'>&{
    password: string
    password_confirmation:string
}



