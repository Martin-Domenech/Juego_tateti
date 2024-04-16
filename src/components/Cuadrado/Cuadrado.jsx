/* eslint-disable react/prop-types */
import './Cuadrado.css'

export const Cuadrado = ({ seleccionado, actualizarTablero, children, index}) => {
    const seleccionadoClass = `celda ${seleccionado ? 'seleccionada' : ''}`

   //console.log({seleccionadoClass})
    const handleClick = () =>{
        actualizarTablero(index)
    }
    return(
        <div onClick={handleClick} className={seleccionadoClass}>
            <h1 className='estado'>{children}</h1>
        </div>
    )
}