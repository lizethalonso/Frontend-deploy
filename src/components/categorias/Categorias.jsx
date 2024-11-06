import { useContextGlobal } from '../../utils/global.context';
import CategoryCard from './CategoryCard';

const Categorias = () => {
    const { state, isLoading } = useContextGlobal();
    const productos = state.data; 
    const categorias = productos.slice(0, 4);

    return (
        <section className="mx-auto px-32 py-12 categories-section w-full">
            {isLoading ? (
                <p>Cargando categorías...</p> // Mensaje mientras carga
            ) : categorias.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                    {categorias.map((producto) => (
                        <CategoryCard key={producto.id} producto={producto} />
                    ))}
                </div>
            ) : (
                <p>No hay categorías disponibles.</p> // Mensaje si está vacío
            )}
        </section>
    );
};

export default Categorias;
