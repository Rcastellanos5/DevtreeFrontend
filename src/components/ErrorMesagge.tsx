
type ErrorMesaggeProps={
    children: React.ReactNode

}
export default function ErrorMesagge({children}:ErrorMesaggeProps){
    return(
        <p className="bg-red-50 text-red-600 p-3 uppercase text-sm font-bold">
            {children}
        </p>
    )
}