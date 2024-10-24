import React from 'react'
import Button from './Button';

const Buscador = () => {
  return (
    <section className="mx-auto bg-primary p-7 flex-col justify-center items-center text-center w-full">
        <h1 className="text-3xl font-bold mb-4 text-white">Busca un cuadro</h1>
        <form action="" className="flex justify-center gap-4 items-center">
            <input type="text" placeholder="🔎 Busca por cuadro, autor o categoría" className="border border-gray-300 w-80 p-2 rounded" />
            <input type="date" className="border border-gray-300 w-60 p-2 rounded" />
            <Button text={"Buscar"} bgColor="amber-400" textColor="black"/>
        </form>
    </section>
  )
}

export default Buscador
