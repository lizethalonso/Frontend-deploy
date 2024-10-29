import { AiOutlineRollback } from "react-icons/ai";

const Modal = ({ producto, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-10 w-screen h-screen">
      <div className="bg-white bg-opacity-90 w-100 h-auto p-6 rounded-lg shadow-lg overflow-y-auto">
      <div className="flex justify-end">
          <button onClick={onClose} className="text-black-600 mb-4 text-3xl">
          <AiOutlineRollback />
          </button>
      </div>
        <div className="flex justify-between items-start">
          <div className="flex-1 pr-4">
            <h2 className="text-3xl font-bold">{producto.nombre}</h2>
            <p className="text-lg mt-2">{producto.descripcion}</p>
            <p className="text-md mt-10 font-semibold">Descripción Extendida:</p>
            <p className="text-md mt-2">{producto.descripcionExtendida}</p>
          </div>
          <img 
            src={producto.img} 
            alt={producto.nombre} 
            className="w-auto h-96 object-cover rounded-lg" 
          />
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {producto.imagenesAdicionales && producto.imagenesAdicionales.length > 0 ? (
            producto.imagenesAdicionales.map((img, index) => (
              <img key={index} src={img} alt={`${producto.nombre} ${index}`} className="w-auto h-48 object-cover rounded-lg" />
            ))
          ) : (
            <p>No hay imágenes adicionales disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

