import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";	
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import { useContextGlobal } from "../../utils/global.context"; 

const Form = ({ edit, obra = {}, onClose, setSuccessMessage, setErrorMessage }) => {
	const { postObra, updateObra, state } = useContextGlobal(); 

	const initialFormData = {
		nombre: "",
		fechaCreacion: "",
		descripcion: "",
		precioRenta: "",
		disponibilidad: true,
		tamano: "",
		tecnicaObra: { nombre: "" },
		movimientoArtistico: { nombreMovimiento: "" },
		artista: { nombre: "" },
	};

	const [formData, setFormData] = useState(edit ? { ...obra } : initialFormData);
	const [files, setFiles] = useState([]); // Estado para almacenar archivos subidos

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

	const handleFilesAdded = (newFiles) => {
		setFiles(newFiles); // Actualiza el estado con los nuevos archivos
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// Asegúrate de que state.data existe y es un array
		const existingObra = state.data && Array.isArray(state.data) 
			? state.data.find(o => o.nombre === formData.nombre) 
			: null; // Maneja el caso donde state.data es undefined o no es un array
		
		if (existingObra && !edit) {
			setErrorMessage("El nombre de la obra ya existe.");
			return;
		}
		
		try {
			const formDataToSend = new FormData();
			
			// Añadir los campos del formulario
			for (const key in formData) {
				formDataToSend.append(key, formData[key]);
			}

			// Añadir los archivos a FormData
			files.forEach((file) => {
				formDataToSend.append("files", file); // Cambia "files" por el nombre del campo que el backend espera
			});

			if (edit) {
				await updateObra(formDataToSend); // Llama a la función de actualización
				setSuccessMessage("La obra se ha editado correctamente.");
			} else {
				await postObra(formDataToSend); // Llama a la función de creación
				setSuccessMessage("La obra se ha creado correctamente.");
			}
		} catch (error) {
			setErrorMessage("Error al guardar la obra. Por favor, intenta nuevamente.");
			console.error("Error saving obra:", error);
		}

		onClose();
	};
	
	// Filtros de campos anidados para creación y edición
	const fieldsToRender = edit
		? Object.keys(obra).filter(field => field !== "img" && field !== "id" && field !== "tecnicaObra" && field !== "movimientoArtistico" && field !== "artista")
		: Object.keys(initialFormData).filter(field => field !== "tecnicaObra" && field !== "movimientoArtistico" && field !== "artista");

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
				value: formData.tecnicaObra?.nombre || "",  
			},
			{
				label: "Movimiento Artístico", 
				name: "movimientoArtistico.nombreMovimiento",
				value: formData.movimientoArtistico?.nombreMovimiento || "",  
			},
			{
				label: "Artista", 
				name: "artista.nombre",
				value: formData.artista?.nombre || "",  
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
			<div className="relative bg-white p-6 rounded-lg shadow-md">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
					aria-label="Cerrar"
				>
					<FaTimes />
				</button>
				<h3 className="text-lg font-bold mb-4">{edit ? "Editar Obra" : "Crear Obra"}</h3>

				<form onSubmit={handleSubmit}>
					{renderFields(fieldsToRender)}
					{renderNestedFields()}
					<ImageUpload onFilesAdded={handleFilesAdded} existingImage={edit ? obra.img : null} />
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