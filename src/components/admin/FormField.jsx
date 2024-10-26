const FormField = ({
	element = "input",
	name,
	value,
	edit,
	onChange,
	children,
}) => {
	const Element =
		element === "textarea"
			? "textarea"
			: element === "select"
			? "select"
			: "input";

	return (
		<label className="font-bold ">
			{name}:
			{Element === "select" ? (
				<select
					name={name.toLowerCase()}
					value={value}
					readOnly={edit}
					onChange={onChange}
					className="block w-full mt-1 mb-2 p-2 font-normal border border-gray-300 rounded"
				>
					{children}
				</select>
			) : (
				<Element
					name={name.toLowerCase()}
					value={value}
					readOnly={edit}
					onChange={onChange}
					className="block w-full font-normal mt-1 mb-4 p-2 border border-gray-300 rounded"
				/>
			)}
		</label>
	);
};

export default FormField;
