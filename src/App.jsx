import './App.css'
import {Cuadrado} from './components/Cuadrado/Cuadrado.jsx'
import { useState } from 'react'

const TURNS = {
  X : 'x',
  O : 'o'
}
const JUEGOS_GANADORES = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [3, 4, 5],
  [2, 5, 8],
  [6, 7, 8],
  [2, 4, 6]
]


function App() {
  const [tablero, setTablero] = useState( Array(9).fill(null) )
  const [turno, setTurno] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const actualizarTablero = (index) =>{
    if (tablero[index] || winner) return
    const nuevoTurno = (turno===TURNS.X ? TURNS.O : TURNS.X)
    setTurno(nuevoTurno)

    const nuevoTablero = [...tablero]
    nuevoTablero[index] = turno
    setTablero(nuevoTablero)


    const nuevoGanador = checkWinner(nuevoTablero)
    if(nuevoGanador){
      setWinner(nuevoGanador)
    }

  }
  const checkWinner = (tableroCheck) => {
    for(const combo of JUEGOS_GANADORES){
      const [a, b, c] = combo
      if(
        tableroCheck[a]&&
        tableroCheck[a]===tableroCheck[b]&&
        tableroCheck[b]===tableroCheck[c]
      ){
        return tableroCheck[a]
      }
    }
    return null
  }

  const restartGame = () =>{
    setTablero(Array(9).fill(null))
    setTurno(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='game'>
      <h1>Ta Te Ti</h1>
      <section className='tablero'>
      {
        tablero.map((valor, index) => {
          return(
            <Cuadrado 
            key={index}
            index={index}
            actualizarTablero={actualizarTablero}
            >
            {tablero[index]}
            </Cuadrado>
          )  
        })
      }
      </section>
        <h3 className='text-turnos'>TURNOS</h3>
      <section className='turnos'>
        <Cuadrado 
        seleccionado = {turno === TURNS.X}>
          {TURNS.X}
        </Cuadrado>
        <Cuadrado seleccionado = {turno === TURNS.O}>
          {TURNS.O}
        </Cuadrado>
      </section>
      <button className='btn-reset' onClick={restartGame}>
        Empezar de nuevo
      </button>
      

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false ? 'empate' : 'Gano: '
                }
              </h2>
              <header className='win'>
                {winner && <Cuadrado>{winner}</Cuadrado>}
              </header>
              <button className='btn-reset' onClick={restartGame}>
               Empezar de nuevo
              </button>
            </div>
          </section>
        )
      }


    </main>
  )
}

export default App
