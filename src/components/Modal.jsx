import React, { useState } from 'react';
import { AiOutlineClose, AiFillPicture } from "react-icons/ai";

const Modal = ({ isOpen, onClose, producto }) => {
  const [showRelated, setShowRelated] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl mx-4">
        
        <div className="relative h-96">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/60 z-10 hover:bg-black/80 transition-colors"
          >
            <AiOutlineClose className="w-6 h-6 text-white" />
          </button>

          <img
            src={producto.img}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{producto.nombre}</h2>
            <p className="text-lg text-white/90">{producto.artista.nombre}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Detalles de la Obra</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Precio de Renta</dt>
                  <dd className="font-semibold text-amber-600">${producto.precioRenta}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Tamaño</dt>
                  <dd className="font-semibold">{producto.tamano}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Técnica</dt>
                  <dd className="font-semibold">{producto.tecnicaObra.nombre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Movimiento</dt>
                  <dd className="font-semibold">{producto.movimientoArtistico.nombre}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Fecha</dt>
                  <dd className="font-semibold">{producto.fechaCreacion}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{producto.descripcion}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setShowRelated(!showRelated)}
              className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
            >
              {showRelated ? 'Ocultar imágenes relacionadas' : 'Ver más'}
            </button>

            {showRelated && (
              <div className="mt-6">
                {producto.imagenesAdicionales && producto.imagenesAdicionales.length > 0 && (
                  <div className="flex overflow-x-auto space-x-2">
                    {producto.imagenesAdicionales.map((imagen, index) => (
                      <img
                        key={index}
                        src={imagen}
                        alt={`Imagen adicional ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                {(!producto.imagenesAdicionales || producto.imagenesAdicionales.length === 0) && (
                  <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 rounded-lg">
                    <AiFillPicture className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 text-center">
                      No hay imágenes relacionadas disponibles 😔
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
