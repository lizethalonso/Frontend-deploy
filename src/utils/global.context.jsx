import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import data from "./data.json";
import categories from "./category.json";
import users from "./user.json";

export const ContextGlobal = createContext(undefined);

export const initialState = { 
  theme: "light", 
  data: [], 
    categories: [],
    users: [],
  activeSection: "obras" 
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
    }, []);  // Solo se ejecuta una vez al montar el componente

    // Cargar datos desde el archivo JSON
    const url = data; // Prueba con data.json

    useEffect(() => {
        dispatch({ type: "GET_ART", payload: url });
            }, []);  // Se ejecuta una sola vez al montar el componente

    // Cargar categorías desde el archivo JSON
    const urlCategories = categories; // Prueba con category.json

    useEffect(() => {
        dispatch({ type: "GET_CATEGORIES", payload: urlCategories });
    }
    , []);  // Se ejecuta una sola vez al montar el componente

    // Cargar usuarios desde el archivo JSON
    const urlUsers = users; // Prueba con user.json

    useEffect(() => {
        dispatch({ type: "GET_USERS", payload: urlUsers });
    }
    , []);  // Se ejecuta una sola vez al montar el componente

    
    return (
        <ContextGlobal.Provider value={{ state, dispatch, isMobile }}>
            {children}
        </ContextGlobal.Provider>
    );
};

export default ContextProvider;

export const useContextGlobal = () => useContext(ContextGlobal);


