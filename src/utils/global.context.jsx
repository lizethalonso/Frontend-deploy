import { useState, useEffect, useReducer, createContext, useContext } from "react";
import { reducer } from "../reducers/reducer";
import { obrasService } from "../api/services";

export const ContextGlobal = createContext(undefined);

export const initialState = { theme: "light", data: [] };

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Configuración de Cloudinary
    const cloudName = "dr1jbzn9r"; // Tu nombre de nube
    const uploadPreset = "ml_default"

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

    useEffect(() => {
        const fetchObras = async () => {
            try {
                const data = await obrasService.getObras();
                dispatch({ type: "GET_OBRA", payload: data });
            } catch (error) {
                console.error("Error fetching obras:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchObras();
    }, []);

    const postObra = async (obra) => {
        try {
            // Si se están subiendo archivos, pasa también 'files'
            const newObra = await obrasService.createObra(obra);
            dispatch({ type: "POST_OBRA", payload: newObra });
        } catch (error) {
            console.error("Error creating obra:", error);
        }
    };

    const updateObra = async (obra) => {
        try {
            const updatedObra = await obrasService.updateObra(obra);
            dispatch({ type: "UPDATE_OBRA", payload: updatedObra });
        } catch (error) {
            console.error("Error updating obra:", error);
        }
    };

    const deleteObra = async (id) => {
        try {
            await obrasService.deleteObra(id);
            dispatch({ type: "DELETE_OBRA", payload: id });
        } catch (error) {
            console.error("Error deleting obra:", error);
        }
    };

    return (
        <ContextGlobal.Provider
            value={{
                state,
                dispatch,
                isMobile,
                isLoading,
                postObra,
                updateObra,
                deleteObra,
                cloudName, // Proporciona el nombre de la nube
                uploadPreset, // Proporciona el upload preset
            }}
        >
            {children}
        </ContextGlobal.Provider>
    );
};

export const useContextGlobal = () => useContext(ContextGlobal);
export default ContextProvider;