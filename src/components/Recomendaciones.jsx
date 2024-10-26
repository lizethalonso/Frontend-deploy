import { useContextGlobal } from '../utils/global.context';
import Card from './Card';

const Recomendaciones = () => {
    const { state } = useContextGlobal();
    const productos = state.data; 

    // Funcion que obtiene y ordena los productos aleatoriamente
    // Luego, muestra los primeros 10.
    const getRandomProducts = (productos, count) => {
        const shuffled = [...productos].sort(() => 0.5 - Math.random()); 
        return shuffled.slice(0, count); 
    };

    const productosAleatorios = getRandomProducts(productos, 10);

    return (
        <section className="bg-background py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl text-primary text-center mb-8">
                    Recomendaciones
                </h2>
                {productosAleatorios.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            {productosAleatorios.slice(0, 5).map((producto) => (
                                <Card key={producto.id} producto={producto} />
                            ))}
                        </div>
                        <div className="space-y-6">
                            {productosAleatorios.slice(5, 10).map((producto) => (
                                <Card key={producto.id} producto={producto} />
                            ))}
                        </div>
                    </div>
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