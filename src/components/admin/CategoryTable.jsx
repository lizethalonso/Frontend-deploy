import { useContextGlobal } from "../../utils/global.context";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Form from "./Form";
import Modal from "./Modal";
import Message from "./Message";

const CategoryTable = () => {
    const { state, setState } = useContextGlobal();
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [editingItem, setEditingItem] = useState(null);
	const [deletingItem, setDeletingItem] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const headers = [
		"ID",
		"Imagen",
		"Titulo",
		"Descripción",
	];

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = state.categories.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(state.categories.length / itemsPerPage);

	const handleEdit = (categoria) => {
		setEditingItem(categoria);
	};

	const handleDelete = (id) => {
		setDeletingItem(id);
	};

	const confirmDelete = () => {
		console.log("Delete", deletingItem);
		setSuccessMessage("El producto se ha eliminado correctamente");
		setDeletingItem(null);
	};

	// Efecto para ocultar los mensajes después de unos segundos
	useEffect(() => {
		if (successMessage || errorMessage) {
			const timer = setTimeout(() => {
				setSuccessMessage(""); // Ocultar el mensaje de éxito
				setErrorMessage(""); // Ocultar el mensaje de error
			}, 3000); // Duración del mensaje en milisegundos

			return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
		}
	}, [successMessage, errorMessage]);

	return (
		<div className="flex flex-col items-center grow max-h-screen  pt-28 relative ">
			<div className="rounded-lg border border-gray-200  max-h-screen mt-2">
				
					<div className="h-[70vh] w-[75vw] max-w-[75vw] flex  flex-col">
						<h3 className="text-center text-white py-4 text-lg font-bold">
							Listado de Categorías
						</h3>

						<div
							id="product-table "
							className=" overflow-y-scroll overflow-x-hidden w-[75vw]"
						>
							<table className="divide-y-2 divide-gray-200 bg-white text-sm w-[75vw] ">
								<thead>
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
									{currentItems.map((categoria) => (
										<tr key={categoria.id}>
											<td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
												{categoria.id}
											</td>
											<td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
												<img
													src={categoria.url}
													alt={
														categoria.nombre || "Imagen"
													}
													className="w-16 h-16 object-cover"
												/>
											</td>
											<td className="break-words whitespace-wrap px-4 py-2 text-gray-700 text-left">
												{categoria.nombre ||
													"Nombre no disponible"}
											</td>
											<td className="break-words whitespace-wrap px-4 py-2 text-gray-700 text-left max-w-[40rem]">
												{categoria.descripcion ||
													"Descripción no disponible"}
											</td>
											
											<td className="whitespace-nowrap px-4 flex grow gap-2 py-2 text-left">
												<button
													onClick={() =>
														handleEdit(categoria)
													}
													className="text-orange text-lg font-bold p-3 border-orange-600 border-2 rounded hover:bg-orange-600/75 hover:text-white hover:border-orange-400"
												>
													<CiEdit />
												</button>
												<button
													onClick={() =>
														handleDelete(categoria.id)
													}
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
					</div>
				
			</div>

			{/* Mostrar mensajes */}
			{successMessage && (
				<div className="fixed bottom-16 right-4 z-50 mb-4">
					<Message
						type="success"
						text={successMessage}
						onClose={() => setSuccessMessage("")}
					/>
				</div>
			)}
			{errorMessage && (
				<div className="fixed bottom-4 right-4 z-50 mb-4">
					<Message
						type="danger"
						text={errorMessage}
						onClose={() => setErrorMessage("")}
					/>
				</div>
			)}

			{/* Modal de confirmación de eliminación */}
			{deletingItem && (
				<Modal
					type="delete"
					text="¿Realmente deseas eliminar este elemento? Esta acción no se puede deshacer."
					options={{
						confirmText: "Eliminar",
						cancelText: "Cancelar",
					}}
					isOpen={!!deletingItem}
					onClose={() => setDeletingItem(null)}
					onConfirm={confirmDelete}
				/>
			)}
		</div>
	);
};

export default CategoryTable
