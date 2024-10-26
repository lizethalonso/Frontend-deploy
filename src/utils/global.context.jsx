import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { reducer } from "../reducers/reducer" 
import data from "./data.json";


export const ContextGlobal = createContext(undefined);

export const initialState = {theme: "light", data: []};

export const ContextProvider = ({ children }) => {
  
  //estado
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state);
  
  /* const url =
    "http://localhost:8080/obra/listartodos"; //url local para conectar con backend
    
        useEffect(() => {
    axios(url).then((res) => {
      console.log(res.data);
      dispatch({ type: "GET_ART", payload: res.data });
    });
  }, []);

    */

    const url = data; //Datos mockeados para iniciar pruebas
    useEffect(() => {
      dispatch({ type: "GET_ART", payload: url });
  }, []);





  return (
    <ContextGlobal.Provider value={{ state, dispatch }}>
      {children}
    </ContextGlobal.Provider>
  );
};
export default ContextProvider;

export const useContextGlobal = () => useContext(ContextGlobal); 