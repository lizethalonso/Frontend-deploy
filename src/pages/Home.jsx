import React from 'react'
import Buscador from '../components/Buscador'
import Categorias from '../components/Categorias'
import Recomendaciones from '../components/Recomendaciones'

const Home = () => {
  return (
    <div>
      <Buscador />
      <Categorias />
      <Recomendaciones />
    </div>
  )
}

export default Home