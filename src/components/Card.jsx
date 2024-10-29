import React, { useState } from 'react'
import Modal from './Modal'

const Card = ({ producto }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className="bg-white bg-opacity-20 rounded-lg overflow-hidden shadow-lg hover:cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img 
            className="w-full h-48 object-cover" 
            src={producto.img} 
            alt={producto.nombre} 
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl font-semibold text-primary">{producto.nombre}</h3>
          <p className="text-secondary text-sm mb-4">{producto.descripcion}</p>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-primary">${producto.precioRenta}</span>
            <span className="bg-secondary bg-opacity-10 text-secondary px-2 py-1 rounded-full text-xs">{producto.tamano}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs">{producto.tecnicaObra.nombre}</span>
            <span className="bg-primary bg-opacity-10 text-primary px-2 py-1 rounded-full text-xs">{producto.movimientoArtistico.nombre}</span>
          </div>
        </div>
        <div className="bg-secondary bg-opacity-5 px-4 py-3">
          <div className="flex justify-between items-center text-xs text-secondary">
            <span>{producto.artista.nombre}</span>
            <span>{producto.fechaCreacion}</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal producto={producto} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Card;
