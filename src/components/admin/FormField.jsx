import { formatLabel} from "../../utils/formatFunctions"; 

const FormField = ({
	element = "input",
	name,
	label,
	value,
	onChange,
	children,
}) => {
	return (
		<label className="font-bold">
			{formatLabel(label)}:
			{element === "select" ? (
				<select
					name={name}
					value={value}
					onChange={onChange}
					className="block w-full mt-1 mb-2 p-2 font-normal border border-gray-300 rounded"
				>
					{children}
				</select>
			) : element === "textarea" ? (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					className="block w-full font-normal mt-1 mb-4 p-2 border border-gray-300 rounded"
				/>
			) : element === "date" ? (
				<input
					type="date"
					name={name}
					value={value}
					onChange={onChange}
					className="block w-full font-normal mt-1 mb-4 p-2 border border-gray-300 rounded"
				/>
			) : (
				<input
					type="text"
					name={name}
					value={value}
					onChange={onChange}
					className="block w-full font-normal mt-1 mb-4 p-2 border border-gray-300 rounded"
				/>
			)}
		</label>
	);
};

export default FormField;
