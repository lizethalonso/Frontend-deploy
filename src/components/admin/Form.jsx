// Form.js
import React from "react";
import FormField from "./FormField";
import { formatLabel, formatDate } from "../../utils/formatFunctions"; // Asegúrate de importar formatDate

const Form = ({ obra, onChange }) => {
	// Incluir todos los campos menos 'img'
	const fieldsToEdit = Object.keys(obra).filter(
		(field) => field !== "img" // Solo excluir la imagen
	);

	return (
		<>
			{fieldsToEdit.map((field) => {
				const isNested = [
					"tecnicaObra",
					"movimientoArtistico",
					"artista",
				].includes(field);
				let fieldValue = isNested
					? obra[field]?.nombre || "" // Asegúrate de que el valor sea el correcto
					: obra[field] || ""; // Usar "" si no hay valor en crear

				if (field === "fechaCreacion") {
					fieldValue = formatDate(fieldValue);
				}

				const fieldType =
					field === "descripcion"
						? "textarea"
						: field === "disponibilidad"
						? "select"
						: "input";

				return (
					<FormField
						key={field}
						element={fieldType}
						name={formatLabel(field)}
						value={
							fieldType === "select"
								? obra[field] // Cambiado para que use el valor del campo correcto
								: fieldValue
						}
						onChange={onChange}
						edit={field === "id"}
					>
						{fieldType === "select" && (
							<>
								<option value="true">Sí</option>
								<option value="false">No</option>
							</>
						)}
					</FormField>
				);
			})}
		</>
	);
};

export default Form;
