import { useContextGlobal } from "../utils/global.context";
import { CiEdit, CiTrash } from "react-icons/ci";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { useState } from "react";

const ProductTable = ({ onEdit, onDelete }) => {
	const { state } = useContextGlobal();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const handleEdit = (id) => {
		console.log("Edit", id);
	};

	const handleDelete = (id) => {
		console.log("Delete", id);
	};

	// Cálculo de índice para mostrar elementos según la página
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = state.data.slice(indexOfFirstItem, indexOfLastItem);

	// Calcular total de páginas
	const totalPages = Math.ceil(state.data.length / itemsPerPage);

	// Cambiar de página
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToPage = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<section className="py-20 bg-black h-screen flex-col grow">
			<h3 className="text-center text-white my-6 text-lg font-bold mt-16">
				Listado de Obras
			</h3>

			<div className="rounded-lg border border-gray-200 mx-20">
				<div className="overflow-x-auto rounded-t-lg">
					<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
						<thead className="ltr:text-left rtl:text-right">
							<tr>
								<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
									ID
								</th>
								<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
									Imagen
								</th>
								<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
									Nombre
								</th>
								<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
									Descripción
								</th>
								<th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
									Acciones
								</th>
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
									<td className="whitespace-nowrap px-4 py-2 text-left">
										<button
											onClick={() => onEdit(obra.id)}
											className="text-orange text-lg font-bold p-3 rounded hover:bg-orange-600/75 hover:text-white"
										>
											<CiEdit />
										</button>
										<button
											onClick={() => onDelete(obra.id)}
											className="text-red text-lg font-bold p-3 rounded hover:bg-red-600/75 hover:text-white"
										>
											<CiTrash />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				{/* Pagination controls */}
				<div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
					<ol className="flex justify-end gap-1 text-xs font-medium">
						<li>
							<button
								onClick={prevPage}
								className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
								disabled={currentPage === 1}
							>
								<GrFormPrevious />
							</button>
						</li>
						{Array.from({ length: totalPages }, (_, i) => (
							<li key={i}>
								<button
									onClick={() => goToPage(i + 1)}
									className={`block size-8 rounded border ${
										currentPage === i + 1
											? "bg-amber-600 text-white"
											: "bg-white text-gray-900"
									} text-center leading-8`}
								>
									{i + 1}
								</button>
							</li>
						))}
						<li>
							<button
								onClick={nextPage}
								className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
								disabled={currentPage === totalPages}
							>
								<GrFormNext />
							</button>
						</li>
					</ol>
				</div>
			</div>
		</section>
	);
};

export default ProductTable;

