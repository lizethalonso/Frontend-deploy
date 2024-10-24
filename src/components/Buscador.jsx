import React from 'react'
import Button from './Button';

const Buscador = () => {
  return (
    <section className="container search-container">
        <h1 className="text-2xl font-bold mb-4">Buscate un cuadro</h1>
        <form action="" className="">
            <input type="text" className="border border-gray-300 p-2 rounded" />
            <input type="date" className="border border-gray-300 p-2 rounded" />
            <Button text={"Buscar"} bgColor="amber-400" textColor="black"/>
        </form>
    </section>
  )
}

export default Buscador
