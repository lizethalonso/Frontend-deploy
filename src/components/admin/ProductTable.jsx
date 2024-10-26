import { useContextGlobal } from "../../utils/global.context";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState } from "react";
import Pagination from "./Pagination";
import EditForm from "./EditForm";

const ProductTable = () => {
	const { state } = useContextGlobal();
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [editingItem, setEditingItem] = useState(null); // Estado para la edición
	const headers = ["ID", "Imagen", "Nombre", "Descripción", "Acciones"];

	// Cálculo de elementos visibles y total de páginas
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = state.data.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(state.data.length / itemsPerPage);

	// Función para abrir el formulario de edición
	const handleEdit = (obra) => {
		setEditingItem(obra); // Establecemos la obra que se va a editar
	};

	// Función para eliminar una obra
	const handleDelete = (id) => {
		console.log("Delete", id);
	};

	return (
		<section className="py-20 bg-black h-full">
			<h3 className="text-center text-white my-6 text-lg font-bold">
				Listado de Obras
			</h3>

			<div className="rounded-lg border border-gray-200 mx-20">
				{/* Renderizar EditForm si se está editando una obra, de lo contrario, renderizar la tabla */}
				{editingItem ? (
					<EditForm
						obra={editingItem}
						onClose={() => setEditingItem(null)} // Cerrar formulario
					/>
				) : (
					<>
						<div className="overflow-x-auto rounded-t-lg">
							<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
								<thead className="ltr:text-left rtl:text-right">
									<tr>
										{headers.map((header, index) => (
											<th
												key={index}
												className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
											>
												{header}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{currentItems.map((obra) => (
										<tr key={obra.id}>
											<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
												{obra.id}
											</td>
											<td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
												<img
													src={obra.img}
													alt={obra.nombre}
													className="w-16 h-16 object-cover"
												/>
											</td>
											<td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
												{obra.nombre}
											</td>
											<td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
												{obra.descripcion}
											</td>
											<td className="whitespace-nowrap px-4 flex gap-2 py-2 text-left">
												<button
													onClick={() => handleEdit(obra)} // Abre el formulario de edición
													className="text-orange text-lg font-bold p-3 border-orange-600 border-2 rounded hover:bg-orange-600/75 hover:text-white hover:border-orange-400"
												>
													<CiEdit />
												</button>
												<button
													onClick={() => handleDelete(obra.id)} // Elimina la obra
													className="text-red text-lg font-bold p-3 border-red-600 border-2 rounded hover:bg-red-600/75 hover:text-white hover:border-red-400"
												>
													<CiTrash />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<Pagination
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							totalPages={totalPages}
						/>
					</>
				)}
			</div>
		</section>
	);
};

export default ProductTable;
