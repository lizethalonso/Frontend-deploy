import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";

const Form = ({ edit, obra = {}, onClose, setSuccessMessage, setErrorMessage }) => {
	const initialFormData = {
		nombre: "",
		fechaCreacion: "",
		descripcion: "",
		precioRenta: "",
		disponibilidad: true,
		tamano: "",
		
	};

	const [formData, setFormData] = useState(edit ? { ...obra } : initialFormData);

	useEffect(() => {
		if (edit) {
			setFormData({ ...obra });
		}
	}, [edit, obra]);

	const handleChange = (e) => {
		const { name, value } = e.target;

		// Manejo de campos anidados
		if (name.includes(".")) {
			const [parent, child] = name.split(".");
			setFormData((prevData) => ({
				...prevData,
				[parent]: {
					...prevData[parent],
					[child]: value,
				},
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Aquí debes verificar si el producto ya existe
		const existingProduct = false; // Cambia esto según tu lógica
		if (existingProduct) {
			setErrorMessage("El nombre del producto ya existe.");
			return;
		}

		console.log("Form data:", formData);
		setSuccessMessage(edit ? "La obra se ha editado correctamente." : "La obra se ha creado correctamente.");
		onClose();
	};

	const fieldsToEdit = Object.keys(obra).filter(field => field !== "img" && field !== "id" && field !== "tecnicaObra" && field !== "movimientoArtistico" && field !== "artista");

	const renderFields = (fields) => {
		return fields.map((field) => {
			const fieldValue = formData[field] || "";
			
			// Manejo de tipos de campos
			const fieldType = 
				field === "descripcion" ? "textarea" : 
				field === "disponibilidad" ? "select" : 
				field === "fechaCreacion" ? "date" : "input";

			return (
				<FormField
					key={field}
					element={fieldType}
					name={field}
					value={fieldValue}
					onChange={handleChange}
					label={field}
				>
					{fieldType === "select" && (
						<>
							<option value="true">Sí</option>
							<option value="false">No</option>
						</>
					)}
				</FormField>
			);
		});
	};

	const renderNestedFields = () => {
		const nestedFields = [
			{
				label: "Técnica", 
				name: "tecnicaObra.nombre",
				value: formData.tecnicaObra.nombre,
			},
			{
				label: "Movimiento Artístico", 
				name: "movimientoArtistico.nombreMovimiento",
				value: formData.movimientoArtistico.nombreMovimiento,
			},
			{
				label: "Artista", 
				name: "artista.nombre",
				value: formData.artista.nombre,
			},
		];

		return nestedFields.map(({ label, name, value }) => (
			<FormField
				key={name}
				element="input"
				name={name}
				value={value}
				onChange={handleChange}
				label={label}
			/>
		));
	};

	return (
		<>
			<div className="relative bg-white p-6 rounded-lg shadow-md ">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
					aria-label="Cerrar"
				>
					<FaTimes />
				</button>
				<h3 className="text-lg font-bold mb-4">{edit ? "Editar Obra" : "Crear Obra"}</h3>

				<form onSubmit={handleSubmit}>
					{edit ? renderFields(fieldsToEdit) : renderFields(Object.keys(initialFormData))}
					{renderNestedFields()}
					<ImageUpload onFilesAdded={(file) => console.log(file)} existingImage={edit ? obra.img : null} />
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
		</>
	);
};

export default Form;
