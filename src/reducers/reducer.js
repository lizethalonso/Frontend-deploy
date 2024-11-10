import { saveToLocalStorage } from "../utils/localStorage";
import {idCreator} from "../utils/formatFunctions"

export const reducer = (state, action) => {
	switch (action.type) {
//GET - LEER
		case "GET_ART":
			return { ...state, data: action.payload };

		case "GET_CATEGORIES":
			return { ...state, categories: action.payload };

		case "GET_USERS":
			return { ...state, users: action.payload };

//ADD - CREAR
		case "ADD_ART":
			const newObra = {
				...action.payload,
				id: action.payload.id || idCreator(payload.data),
			};
			const newDataArt = [...state.data, newObra];
			saveToLocalStorage("data", newDataArt);
			return { ...state, data: newDataArt };

		case "ADD_CATEGORY":
			

			const newCategories = [...state.categories, action.payload];
			saveToLocalStorage("categories", newCategories);
			return { ...state, categories: newCategories };
	
		case "ADD_USER":
			const newUserWithId = {
				...newUser,
				id: idCreator(state.users),
			};
			const newDataUser = [...state.data, newUserWithId];
			console.log("dispatch: ", action.payload);
			saveToLocalStorage("users", newDataUser);
			return { ...state, users: newDataUser };
			
//UPDATE - EDITAR
		case "UPDATE_ART":
			return {
				...state,
				data: state.data.map((obra) =>
					obra.id === action.payload.id
						? { ...obra, ...action.payload }
						: obra
				),
			};
		case "UPDATE_CATEGORY":
			const updatedCategories = state.categories.map((item) =>
				item.id === action.payload.id
					? { ...item, ...action.payload }
					: item
			);
			saveToLocalStorage("categories", updatedCategories);
			return { ...state, categories: updatedCategories };

		case "UPDATE_USER":
			return {
				...state,
				users: state.users.map((user) =>
					user.id === action.payload.id ? action.payload : user
				),
			};

//DELETE - ELIMINAR
		case "DELETE_ART":
			const filteredData = state.data.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("data", filteredData);
			return { ...state, data: filteredData };

		case "DELETE_CATEGORY":
			const filteredCategories = state.categories.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("categories", filteredCategories);
			return { ...state, categories: filteredCategories };

		case "DELETE_USER":
			const filteredDataUser = state.users.filter(
				(item) => item.id !== action.payload.id
			);
			saveToLocalStorage("users", filteredDataUser);
			return { ...state, users: filteredDataUser };



//IMAGENES - Manejo de imagenes en LocalStorage
		case "ADD_IMAGE":
			const newImages = [...state.images, action.payload]; // action.payload puede ser una URL o base64
			saveToLocalStorage("images", newImages); // Guarda las imágenes en localStorage
			return { ...state, images: newImages };
		
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

		

//OTRAS - Acciones extra
		case "CHANGE_THEME":
			return { ...state, theme: action.payload };

		case "SET_ACTIVE_SECTION":
			console.log("Cambiando sección a reducer:", action.payload);
			return { ...state, activeSection: action.payload };

		default:
			throw new Error("Acción no existente");
	}
};
