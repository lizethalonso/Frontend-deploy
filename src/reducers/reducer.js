import { saveToLocalStorage } from "../utils/localStorage";

export const reducer = (state, action) => {
	switch (action.type) {
		case "GET_ART":
			return { ...state, data: action.payload };

		case "GET_CATEGORIES":
			return { ...state, categories: action.payload };

		case "GET_USERS":
			return { ...state, users: action.payload };

		case "ADD_ART":
			// Asignar un ID único si no está presente en la obra
			const newObra = {
				...action.payload,
				id: action.payload.id || new Date().getTime(), // Genera un ID único
			};
			const newData = [...state.data, newObra];
			saveToLocalStorage("data", newData);
			return { ...state, data: newData };

		case "UPDATE_ART":
			return {
				...state,
				data: state.data.map((obra) =>
					obra.id === action.payload.id
						? { ...obra, ...action.payload }
						: obra
				),
			};

		case "DELETE_ART":
			const filteredData = state.data.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("data", filteredData);
			return { ...state, data: filteredData };

		case "ADD_CATEGORY":
			const newCategories = [...state.categories, action.payload];
			saveToLocalStorage("categories", newCategories);
			return { ...state, categories: newCategories };

		case "UPDATE_CATEGORY":
			const updatedCategories = state.categories.map((item) =>
				item.id === action.payload.id
					? { ...item, ...action.payload }
					: item
			);
			saveToLocalStorage("categories", updatedCategories);
			return { ...state, categories: updatedCategories };

		case "DELETE_CATEGORY":
			const filteredCategories = state.categories.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("categories", filteredCategories);
			return { ...state, categories: filteredCategories };

		case "ADD_USER":
			console.log("dispatch: ",action.payload)
			return { ...state, users: [...state.users, action.payload] };

		case "UPDATE_USER":
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user
				),
			};
		case "DELETE_USER":
			const filteredDataUser = state.users.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("users", filteredDataUser);
			return { ...state, users: filteredDataUser };

		case "CHANGE_THEME":
			return { ...state, theme: action.payload };

		case "SET_ACTIVE_SECTION":
			console.log("Cambiando sección a reducer:", action.payload); // Verifica que el payload sea el correcto
			return { ...state, activeSection: action.payload };
		case "ADD_IMAGE":
			const newImages = [...state.images, action.payload]; // action.payload puede ser una URL o base64
			saveToLocalStorage("images", newImages); // Guarda las imágenes en localStorage
			return { ...state, images: newImages };

		case "UPDATE_IMAGE":
			const updatedImages = state.images.map((image) =>
				image.id === action.payload.id
					? { ...image, ...action.payload }
					: image
			);
			saveToLocalStorage("images", updatedImages);
			return { ...state, images: updatedImages };

		case "DELETE_IMAGE":
			const filteredImages = state.images.filter(
				(image) => image.id !== action.payload.id
			);
			saveToLocalStorage("images", filteredImages);
			return { ...state, images: filteredImages };

		case "ADD_IMAGE_TO_ART":
			return {
				...state,
				data: state.data.map((obra) =>
					obra.id === action.payload.artId
						? {
								...obra,
								imagenesAdicionales: [
									...obra.imagenesAdicionales,
									action.payload.imgUrl,
								],
						  }
						: obra
				),
			};

		default:
			throw new Error("Acción no existente");
	}
};
