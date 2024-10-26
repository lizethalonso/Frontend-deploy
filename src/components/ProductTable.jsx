const ProductTable = ({ data, onEdit, onDelete }) => {
	return (
		<section className="pt-12">
			<h3 className="text-center my-6 text-lg font-bold">Listado de Obras</h3>
			<table className="min-w-full bg-white border border-gray-200 pb-16">
				<thead>
					<tr>
						<th className="py-2 px-4 border-b">ID</th>
						<th className="py-2 px-4 border-b">Nombre</th>
						<th className="py-2 px-4 border-b">Descripción</th>
						<th className="py-2 px-4 border-b">Imagen</th>
						<th className="py-2 px-4 border-b">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{data.map((obra) => (
						<tr key={obra.id} className="text-center">
							<td className="py-2 px-4 border-b">{obra.id}</td>
							<td className="py-2 px-4 border-b">
								{obra.nombre}
							</td>
							<td className="py-2 px-4 border-b">
								{obra.descripcion}
							</td>
							<td className="py-2 px-4 border-b">
								<img
									src={obra.img}
									alt={obra.nombre}
									className="w-16 h-16 object-cover"
								/>
							</td>
							<td className="py-2 px-4 border-b">
								<button
									onClick={() => onEdit(obra.id)}
									className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
								>
									Editar
								</button>
								<button
									onClick={() => onDelete(obra.id)}
									className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default ProductTable;
