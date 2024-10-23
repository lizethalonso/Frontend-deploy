import React from 'react'
import Button from './Button';

const Buscador = () => {
  return (
    <section className="container search-container">
        <h1>Buscate un cuadro</h1>
        <form action="">
            <input type="text" />
            <input type="date" />
            <Button />
        </form>
    </section>
  )
}

export default Buscador