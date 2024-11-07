import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FormField from "./FormField";
import ImageUpload from "./ImageUpload";
import { useContextGlobal } from "../../utils/global.context";

const Form = ({
	edit,
	obra = {},
	onClose,
	setSuccessMessage,
	setErrorMessage,
}) => {
	const { postObra, updateObra, state } = useContextGlobal();

	const initialFormData = {
		nombre: "",
		fechaCreacion: "",
		descripcion: "",
		precioRenta: "",
		disponibilidad: "true",
		tamano: "",
		tecnicaObra: { id: "" },
		movimientoArtistico: { id: "" },
		artista: { id: "" },
	};

	const [formData, setFormData] = useState(
		edit ? { ...obra } : initialFormData
	);
	const [files, setFiles] = useState([]);

	useEffect(() => {
		if (edit) {
			setFormData({ ...obra });
		}
	}, [edit, obra]);

	const handleChange = (e) => {
		const { name, value } = e.target;

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
		setFiles((prevFiles) => [...prevFiles, ...newFiles]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataToSend = new FormData();
	
		// Append all top-level fields
		formDataToSend.append("nombre", formData.nombre);
		formDataToSend.append("fechaCreacion", formData.fechaCreacion);
		formDataToSend.append("descripcion", formData.descripcion);
		formDataToSend.append("precioRenta", formData.precioRenta);
		formDataToSend.append("disponibilidad", formData.disponibilidad);
		formDataToSend.append("tamano", formData.tamano);
	
		// Flatten the nested objects, e.g., tecnicaObra.id, movimientoArtistico.id, artista.id
		formDataToSend.append("tecnicaObra.id", formData.tecnicaObra.id);
		formDataToSend.append("movimientoArtistico.id", formData.movimientoArtistico.id);
		formDataToSend.append("artista.id", formData.artista.id);
	
		// Append each file
		if (files && files.length > 0) {
			files.forEach((file) => {
				formDataToSend.append("files", file);
			});
		}
	
		try {
			if (edit) {
				await updateObra(formDataToSend);
				setSuccessMessage("La obra se ha editado correctamente.");
			} else {
				await postObra(formDataToSend);
				setSuccessMessage("La obra se ha creado correctamente.");
			}
		} catch (error) {
			setErrorMessage("Error al guardar la obra. Por favor, intenta nuevamente.");
			console.error("Error saving obra:", error);
		}
	
		onClose();
	};

	const fieldsToRender = edit
		? Object.keys(obra).filter(
				(field) =>
					![
						"img",
						"id",
						"tecnicaObra",
						"movimientoArtistico",
						"artista",
					].includes(field)
		  )
		: Object.keys(initialFormData).filter(
				(field) =>
					!["tecnicaObra", "movimientoArtistico", "artista"].includes(
						field
					)
		  );

		  const renderFields = (fields) => {
			return fields.map((field) => {
				const fieldValue = formData[field] || "";
		
				const fieldType =
					field === "descripcion"
						? "textarea"
						: field === "disponibilidad" || field === "tamano" // Update here for "tamano"
						? "select"
						: field === "fechaCreacion"
						? "date"
						: "input";
		
				return (
					<FormField
						key={field}
						element={fieldType}
						name={field}
						value={fieldValue}
						onChange={handleChange}
						label={field}
					>
						{fieldType === "select" && field === "disponibilidad" && (
							<>
								<option value="true">Sí</option>
								<option value="false">No</option>
							</>
						)}
						{fieldType === "select" && field === "tamano" && (
							<>
								<option value="GRANDE">GRANDE</option>
								<option value="MEDIANO">MEDIANO</option>
								<option value="PEQUEÑO">PEQUEÑO</option>
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
				name: "tecnicaObra.id",
				value: formData.tecnicaObra?.id || "",
			},
			{
				label: "Movimiento Artístico",
				name: "movimientoArtistico.id",
				value: formData.movimientoArtistico?.id || "",
			},
			{
				label: "Artista",
				name: "artista.id",
				value: formData.artista?.id || "",
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
		<div className="relative bg-white p-6 rounded-lg shadow-md">
			<button
				onClick={onClose}
				className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
				aria-label="Cerrar"
			>
				<FaTimes />
			</button>
			<h3 className="text-lg font-bold mb-4">
				{edit ? "Editar Obra" : "Crear Obra"}
			</h3>

			<form onSubmit={handleSubmit}>
				{renderFields(fieldsToRender)}
				{renderNestedFields()}
				<ImageUpload
					onFilesAdded={handleFilesAdded}
					existingImage={edit ? obra.img : null}
				/>
				<div className="flex justify-between mt-4">
					<button
						type="submit"
						className="bg-amber-600 text-white py-2 px-4 rounded"
					>
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

export default Form;
