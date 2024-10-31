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
import { obrasService } from "../api/services";

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


/* 	useEffect(() => {
		const data = obrasService.getObras();
			console.log(data);
			dispatch({ type: "GET_ART", payload: data });
		;
	}, []); */

	const url = data;  // Prueba con data.json

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
