import { useContextGlobal } from '../../utils/global.context';
import CategoryCard from './CategoryCard';

const Categorias = () => {
  const { state } = useContextGlobal();
  const productos = state.data; 
  const categorias = productos.slice(0, 4);

  return (
    <section className="mx-auto px-32 py-12 categories-section w-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {categorias.map((producto) => (
          <CategoryCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  )
}

export default Categorias