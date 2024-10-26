import React, { useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import ImageUpload from "./ImageUpload"; // Importar el nuevo componente
import Form from "./Form"; // Importar el componente Form

const EditForm = ({ obra = {}, onClose }) => {
	const [formData, setFormData] = useState({ ...obra });
	const formRef = useRef(null); // Referencia para el formulario

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
		<div className="relative bg-white p-6 rounded-lg shadow-md" ref={formRef}>
			<button
				onClick={onClose}
				className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
				aria-label="Cerrar"
			>
				<FaTimes />
			</button>
			<h3 className="text-lg font-bold mb-4">Editar Obra</h3>
			<form onSubmit={handleSubmit}>
				<Form obra={formData} onChange={handleChange} />
				<ImageUpload onFilesAdded={(file) => console.log(file)} existingImage={obra.img} />
				<div className="flex justify-between mt-4">
					<button type="submit" className="bg-amber-600 text-white py-2 px-4 rounded">
						Guardar
					</button>
					<button
						type="button"
						className="bg-gray-500 text-white py-2 px-4 rounded"
						onClick={onClose}
					>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditForm;
