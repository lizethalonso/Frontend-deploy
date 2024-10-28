import axios from "axios";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { reducer } from "../reducers/reducer";
import data from "./data.json";

export const ContextGlobal = createContext(undefined);

export const initialState = { theme: "light", data: [] };

export const ContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isMobile, setIsMobile] = useState(false);

    // evaluar si es mobile
    const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 769);
    };

    useEffect(() => {
        checkIfMobile(); 
        window.addEventListener("resize", checkIfMobile); 

        return () => {
            window.removeEventListener("resize", checkIfMobile); 
        };
    }, []);


    /* const url =
    "http://localhost:8080/obra/listartodos"; //url local para conectar con backend
    
        useEffect(() => {
    axios(url).then((res) => {
      console.log(res.data);
      dispatch({ type: "GET_ART", payload: res.data });
    });
  }, []);

    */

    const url = data; // Prueba con data.json

    useEffect(() => {
        dispatch({ type: "GET_ART", payload: url });
    }, []);

    return (
        <ContextGlobal.Provider value={{ state, dispatch, isMobile }}>
            {children}
        </ContextGlobal.Provider>
    );
};

export default ContextProvider;

export const useContextGlobal = () => useContext(ContextGlobal);
