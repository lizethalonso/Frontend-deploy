import axiosConfig from "./axiosConfig";

export const obrasService = {
    getObras: async () => {
        try {
            const response = await axiosConfig.get("/obra/listartodos");
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    getObra: async (id) => {
        try {
            const response = await axiosConfig.get(`/obra/listar/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    createObra: async (obra) => {
        try {
            const response = await axiosConfig.post("/obra/crear", obra);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    updateObra: async (obra) => {
        try {
            const response = await axiosConfig.put("/obra/actualizar", obra);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    deleteObra: async (id) => {
        try {
            const response = await axiosConfig.delete(`/obra/eliminar/${id}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },

    
};

