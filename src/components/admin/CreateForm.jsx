import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Form from "./Form";
import ImageUpload from "./ImageUpload";


const CreateForm = ({ onClose }) => {
    // Esquema inicial con todos los campos de la obra
	const initialFormData = {
		id: "", // ID podría generarse automáticamente en el backend
		nombre: "",
		fechaCreacion: "",
		descripcion: "",
		precioRenta: "",
		img: null,
		disponibilidad: true, // O false, según el valor por defecto
		tamano: "",
		tecnicaObra: { id: "", nombre: "" },
		movimientoArtistico: { id: "", nombreMovimiento: "" },
		artista: { id: "", nombre: "" }
	};

	const [formData, setFormData] = useState(initialFormData); // Usa initialFormData como estado inicial

	// Manejar cambios en los campos del formulario
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form data:", formData);
		onClose(); // Cerrar el formulario después de enviar
	};

	return (
		<section className="py-24 bg-black h-full ">
			<div className="relative bg-white p-6 rounded-lg shadow-md mx-20">
				{/* Botón de cerrar */}
				<button
					onClick={onClose}
					className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
					aria-label="Cerrar"
				>
					<FaTimes />
				</button>
				<h3 className="text-lg font-bold mb-4">Crear Obra</h3>
				<form onSubmit={handleSubmit}>
					<Form obra={formData} onChange={handleChange} />
					<ImageUpload onFilesAdded={(file) => console.log(file)} existingImage={null} />
					<div className="flex justify-between mt-4">
						<button type="submit" className="bg-amber-600 text-white py-2 px-4 rounded">
							Guardar
						</button>
						<button
							type="button"
							className="bg-gray-500 text-white py-2 px-4 rounded"
							onClick={onClose} // Llamada a onClose en cancelar
						>
							Cancelar
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};

export default CreateForm;

