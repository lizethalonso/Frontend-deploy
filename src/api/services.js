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

    createObra: async (obra, files) => {
        try {
            const formData = new FormData();
            
            // Agregar los datos de la obra
            formData.append("obra", new Blob([JSON.stringify(obra)], { type: "application/json" }));
    
            // Agregar archivos, si los hay
            if (files && files.length) {
                for (let i = 0; i < files.length; i++) {
                    formData.append("files", files[i]);
                }
            } else {
                console.warn("No files provided or files is not an array");
            }
    
            // Enviar la solicitud POST
            const response = await axiosConfig.post("/obra", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });
    
            return response.data;
        } catch (error) {
            console.error("Error al crear la obra:", error);
            throw error; 
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

