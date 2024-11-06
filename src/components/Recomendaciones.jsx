import { useContextGlobal } from '../utils/global.context';
import Card from './Card';
import { AiFillCaretLeft, AiFillCaretRight, AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import { useState } from 'react';

const Recomendaciones = () => {
    const { state, isLoading } = useContextGlobal();
    const productos = state.data;

    const getRandomProducts = (productos, count) => {
        const shuffled = [...productos].sort(() => 0.5 - Math.random()); 
        return shuffled.slice(0, count); 
    };

    const productosAleatorios = getRandomProducts(productos, 10);

    const cardsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(productosAleatorios.length / cardsPerPage);
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = productosAleatorios.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-10xl mx-auto px-4 lg:px-32">
                <h2 className="text-3xl text-primary text-left mb-8">
                    Recomendaciones
                </h2>
                {isLoading ? (
                    <p>Cargando recomendaciones...</p>
                ) : productosAleatorios.length > 0 ? (
                    <>
                        <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {currentCards.map((producto) => (
                                <Card key={producto.id} producto={producto} />
                            ))}
                        </div>
                        {/* Pagination */}
                    </>
                ) : (
                    <p className='text-white'>No hay recomendaciones disponibles.</p>
                )}
            </div>
        </section>
    );
};

export default Recomendaciones;
