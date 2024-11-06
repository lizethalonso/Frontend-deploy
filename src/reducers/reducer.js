export const reducer = (state, action) => {
	switch (action.type) {
		case "GET_OBRA":
			return { ...state, data: action.payload };
		case "POST_OBRA":
			return { ...state, data: [...state.data, action.payload] };
		case "UPDATE_OBRA":
			return {
				...state,
				data: state.data.map((obra) =>
					obra.id === action.payload.id ? action.payload : obra
				),
			};
		case "DELETE_OBRA":
			return {
				...state,
				data: state.data.filter((obra) => obra.id !== action.payload),
			};

		case "CHANGE_THEME":
			console.log(action.payload);
			return { ...state, theme: action.payload };

		default:
			throw new Error(`Acción no existente: ${action.type}`);
	}
};
