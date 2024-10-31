import { useContextGlobal } from "../../utils/global.context";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Form from "./Form";
import Modal from "./Modal";
import Message from "./Message";

const ProductTable = () => {
	const { state, setState } = useContextGlobal(); 
	const itemsPerPage = 5;
	const [currentPage, setCurrentPage] = useState(1);
	const [editingItem, setEditingItem] = useState(null);
	const [deletingItem, setDeletingItem] = useState(null);
	const [successMessage, setSuccessMessage] = useState(""); 
	const [errorMessage, setErrorMessage] = useState("");
	const headers = ["ID", "Imagen", "Nombre", "Descripción", "Acciones"];

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = state.data.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(state.data.length / itemsPerPage);

	const handleEdit = (obra) => {
		setEditingItem(obra);
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
		<section className="py-28  h-full">
			<h3 className="text-center text-white my-6 text-lg font-bold">
				Listado de Obras
			</h3>

			<div className="rounded-lg border border-gray-200 mx-20">
				{editingItem ? (
					<Form
						edit={true}
						obra={editingItem}
						onClose={() => setEditingItem(null)}
						setSuccessMessage={setSuccessMessage}
						setErrorMessage={setErrorMessage}
					/>
				) : (
					<>
						<div className="overflow-x-auto rounded-t-lg">
							<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
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
													onClick={() =>
														handleEdit(obra)
													}
													className="text-orange text-lg font-bold p-3 border-orange-600 border-2 rounded hover:bg-orange-600/75 hover:text-white hover:border-orange-400"
												>
													<CiEdit />
												</button>
												<button
													onClick={() =>
														handleDelete(obra.id)
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
					</>
				)}
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
		</section>
	);
};

export default ProductTable;
