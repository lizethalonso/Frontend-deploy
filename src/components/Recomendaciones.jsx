import { useContextGlobal } from '../utils/global.context';
import Card from './Card';
import { AiFillCaretLeft, AiFillCaretRight, AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import { useState } from 'react';

const Recomendaciones = () => {
    const { state } = useContextGlobal();
    const productos = state.data; 

    // Funcion que obtiene y ordena los productos aleatoriamente
    const getRandomProducts = (productos, count) => {
        const shuffled = [...productos].sort(() => 0.5 - Math.random()); 
        return shuffled.slice(0, count); 
    };

    const productosAleatorios = getRandomProducts(productos, 10);

    // Calculos de paginacion
    const cardsPerPage = 4; 
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productosAleatorios.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = productosAleatorios.slice(indexOfFirstCard, indexOfLastCard);

    // Generar array con numeros de pagina
    const getPageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10xl mx-auto px-4 lg:px-32">
                <h2 className="text-3xl text-primary text-left mb-8">
                    Recomendaciones
                </h2>
                {productosAleatorios.length > 0 ? (
                    <>
                        <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentCards.map((producto) => (
                                <Card key={producto.id} producto={producto} />
                            ))}
                        </div>
                        
                        <div className="flex justify-center items-center space-x-2 mt-8">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="First page"
                            >
                                <AiFillFastBackward className="w-5 h-5 text-primary" />
                            </button>
                            
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Previous page"
                            >
                                <AiFillCaretLeft className="w-5 h-5 text-primary" />
                            </button>

                            <div className="flex items-center space-x-1">
                                {getPageNumbers().map((number, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof number === 'number' && handlePageChange(number)}
                                        className={`w-8 h-8 text-white flex items-center justify-center rounded-full
                                            ${currentPage === number 
                                                ? 'bg-yellow-500 text-white' 
                                                : 'hover:bg-gray-100'}
                                            ${typeof number !== 'number' ? 'cursor-default' : 'cursor-pointer'}
                                        `}
                                    >
                                        {number}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Next page"
                            >
                                <AiFillCaretRight className="w-5 h-5 text-primary" />
                            </button>
                            
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Last page"
                            >
                                <AiFillFastForward className="w-5 h-5 text-primary" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-secondary">Algo pasó. No hay obras disponibles. 😔</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Recomendaciones;