import React, { useState } from 'react';
import { AiOutlineClose, AiFillPicture } from "react-icons/ai";

const Modal = ({ isOpen, onClose, producto }) => {
  const [showRelated, setShowRelated] = useState(true);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-amber-600 z-10 hover:bg-amber-700 transition-colors"
        >
          <AiOutlineClose className="w-6 h-6 text-white" />
        </button>

        <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">{producto.nombre}</h2>
        <p className="text-xl text-gray-600 mb-6">{producto.artista.nombre}</p>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Imagen Principal y Detalles */}
            <div className="flex-1">
              <img
                src={producto.img}
                alt={producto.nombre}
                className="w-full aspect-[5/3] object-cover rounded-lg mb-6"
              />

              <div className="space-y-4 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-semibold">Fecha de creación:</h3>
                  <p>{producto.fechaCreacion}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Descripción:</h3>
                  <p className="text-gray-600">{producto.descripcion}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Movimiento artístico - técnica:</h3>
                  <p>{producto.movimientoArtistico.nombre} - {producto.tecnicaObra.nombre}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Dimensiones:</h3>
                  <p>{producto.tamano}</p>
                </div>

                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">${producto.precioRenta} / día</p>
                </div>

                <button className="w-full py-3 px-4 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                  Alquilar
                </button>

              </div>
            </div>

            {/* Imágenes Adicionales y Precio */}
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {producto.imagenesAdicionales?.slice(0, 4).map((imagen, index) => (
                    <img
                      key={index}
                      src={imagen}
                      alt={`Vista ${index + 1} de ${producto.nombre}`}
                      className="w-full aspect-square object-cover rounded-lg"
                    />
                  ))}
                </div>
                <button className="w-full py-3 px-4 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;