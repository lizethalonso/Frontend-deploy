import { useContextGlobal } from "../../utils/global.context";
import { CiEdit, CiTrash } from "react-icons/ci";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Form from "./Form";
import Modal from "./Modal";
import Message from "./Message";

const UserTable = () => {
    const { state, setState } = useContextGlobal();
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    // Definir los encabezados según los datos de usuarios
    const headers = [
        "ID",
        "Nombre",
        "Apellido",
        "Correo electrónico",
        "Rol"
    ];

    // Mapeo de roles
    const roleMapping = {
        ADMIN: "ADMINISTRADOR",
        USER: "USUARIO",
        COLAB: "COLABORADOR"
    };

    // Función para mapear los roles a sus versiones legibles
    const mapRole = (role) => {
        return roleMapping[role] || "Rol no disponible";
    };

    // Calcular los índices para la paginación
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = state.users.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(state.users.length / itemsPerPage);

    const handleEdit = (user) => {
        setEditingItem(user);
    };

    const handleDelete = (id) => {
        setDeletingItem(id);
    };

    const confirmDelete = () => {
        console.log("Delete", deletingItem);
        setSuccessMessage("El usuario se ha eliminado correctamente");
        setDeletingItem(null);
    };

    const handleRoleChange = (userId, newRole) => {
        // Convertimos el nuevo rol a su valor original para guardarlo en la base de datos
        const roleValue = Object.keys(roleMapping).find(key => roleMapping[key] === newRole);
        const updatedUsers = state.users.map(user => 
            user.id === userId ? { ...user, rol: roleValue } : user
        );
        setState({ ...state, users: updatedUsers });
    };

    // Efecto para ocultar los mensajes después de unos segundos
    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(""); // Ocultar el mensaje de éxito
                setErrorMessage(""); // Ocultar el mensaje de error
            }, 3000); // Duración del mensaje en milisegundos

            return () => clearTimeout(timer); // Limpiar el temporizador al desmontar
        }
    }, [successMessage, errorMessage]);

    return (
        <div className="flex flex-col items-center grow max-h-screen pt-28 relative">
            <div className="rounded-lg border border-gray-200 max-h-screen mt-2">
                <div className="h-[70vh] w-[75vw] max-w-[75vw] flex flex-col">
                    <h3 className="text-center text-white py-4 text-lg font-bold">
                        Listado de Usuarios
                    </h3>

                    <div id="user-table" className="overflow-y-scroll overflow-x-hidden w-[75vw]">
                        <table className="divide-y-2 divide-gray-200 bg-white text-sm w-[75vw]">
                            <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th
                                            key={index}
                                            className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left"
                                        >
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentItems.map((user) => (
                                    <tr key={user.id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                                            {user.id}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                            {user.name || "Nombre no disponible"}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                            {user.lastname || "Apellido no disponible"}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                            {user.email || "Correo no disponible"}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-left">
                                            <select 
                                                value={mapRole(user.rol)} 
                                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                className="bg-white border border-gray-300 rounded-lg p-1"
                                            >
                                                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                                <option value="COLABORADOR">COLABORADOR</option>
                                                <option value="USUARIO">USUARIO</option>
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap px-4 flex gap-2 py-2 text-left">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="text-orange text-lg font-bold p-3 border-orange-600 border-2 rounded hover:bg-orange-600/75 hover:text-white hover:border-orange-400"
                                            >
                                                <CiEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                className="text-red text-lg font-bold p-3 border-red-600 border-2 rounded hover:bg-red-600/75 hover:text-white hover:border-red-400"
                                            >
                                                <CiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPages={totalPages}
                    />
                </div>
            </div>

            {/* Mostrar mensajes */}
            {successMessage && (
                <div className="fixed bottom-16 right-4 z-50 mb-4">
                    <Message
                        type="success"
                        text={successMessage}
                        onClose={() => setSuccessMessage("")}
                    />
                </div>
            )}
            {errorMessage && (
                <div className="fixed bottom-4 right-4 z-50 mb-4">
                    <Message
                        type="danger"
                        text={errorMessage}
                        onClose={() => setErrorMessage("")}
                    />
                </div>
            )}

            {/* Modal de confirmación de eliminación */}
            {deletingItem && (
                <Modal
                    type="delete"
                    text="¿Realmente deseas eliminar este usuario? Esta acción no se puede deshacer."
                    options={{
                        confirmText: "Eliminar",
                        cancelText: "Cancelar",
                    }}
                    isOpen={!!deletingItem}
                    onClose={() => setDeletingItem(null)}
                    onConfirm={confirmDelete}
                />
            )}
        </div>
    );
};

export default UserTable;

