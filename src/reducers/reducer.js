export const reducer = (state, action) => {
	switch (action.type) {
		case "GET_ART":
			return { ...state, data: action.payload };


		case "GET_CATEGORIES":
			return { ...state, categories: action.payload };

		case "GET_USERS":
			return { ...state, users: action.payload };

		case "CHANGE_THEME":
			return { ...state, theme: action.payload };

		case "SET_ACTIVE_SECTION":
			console.log("Cambiando sección a reducer:", action.payload); // Verifica que el payload sea el correcto
			return { ...state, activeSection: action.payload };

		default:
			throw new Error("Acción no existente");
	}
};
