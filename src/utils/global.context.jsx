import axios from "axios";
import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from "react";
import { reducer } from "../reducers/reducer";
import data from "./data.json";
import categories from "./category.json";
import users from "./user.json";
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"; // Importar las funciones de localStorage

export const ContextGlobal = createContext(undefined);

export const initialState = {
    theme: "light",
    data: loadFromLocalStorage("data") || [],
    categories: loadFromLocalStorage("categories") || [],
    users: loadFromLocalStorage("users") || [],
    images: loadFromLocalStorage("images") || [],  // Cargar imágenes desde localStorage
    activeSection: "obras",
};

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isMobile, setIsMobile] = useState(false);

    // Evaluar si es mobile
    const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 769);
    };

    useEffect(() => {
        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        return () => {
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    const url = data; // Este es el archivo JSON que contiene los datos predeterminados de las obras
    useEffect(() => {
        if (!loadFromLocalStorage("data")) {
            dispatch({ type: "GET_ART", payload: url });
        }
    }, []);

    // Cargar categorías desde el archivo JSON (o desde localStorage si existen)
    const urlCategories = categories;
    useEffect(() => {
        if (!loadFromLocalStorage("categories")) {
            dispatch({ type: "GET_CATEGORIES", payload: urlCategories });
        }
    }, []);

    // Cargar usuarios desde el archivo JSON (o desde localStorage si existen)
    const urlUsers = users;
    useEffect(() => {
        if (!loadFromLocalStorage("users")) {
            dispatch({ type: "GET_USERS", payload: urlUsers });
        }
    }, []);

    // Guardar los cambios de los datos en localStorage
    useEffect(() => {
        saveToLocalStorage("data", state.data);
        saveToLocalStorage("categories", state.categories);
        saveToLocalStorage("users", state.users);
    }, [state.data, state.categories, state.users]); // Solo cuando estos cambien

    // Guardar las imágenes en localStorage cuando cambien
    useEffect(() => {
        if (state.images.length > 0) {
            saveToLocalStorage("images", state.images);
        }
    }, [state.images]);

    return (
        <ContextGlobal.Provider value={{ state, dispatch, isMobile }}>
            {children}
        </ContextGlobal.Provider>
    );
};

export default ContextProvider;

export const useContextGlobal = () => useContext(ContextGlobal);
