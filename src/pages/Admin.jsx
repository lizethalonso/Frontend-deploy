import React, { useState } from "react";
import SubHeader from "../components/SubHeader";
import ProductTable from "../components/admin/ProductTable";
import CreateForm from "../components/admin/CreateForm"; // Importar el nuevo componente
import ContextProvider from "../utils/global.context";

const Admin = () => {
	const [isCreatingProduct, setIsCreatingProduct] = useState(false); // Estado para controlar la vista

	const handleAddProduct = () => {
		setIsCreatingProduct(true); // Mostrar el formulario de creación
	};

	const handleListProducts = () => {
		setIsCreatingProduct(false); // Volver a mostrar la tabla de productos
	};

	const buttons = {
		1: [
			{
				text: "Agregar producto",
				textColor: "primary",
				bgColor: "transparent",
				action: handleAddProduct,
			},
		],
		2: [
			{
				text: "Lista de productos",
				textColor: "primary",
				bgColor: "transparent",
				action: handleListProducts,
			},
		],
	};

	return (
		<div className="min-h-screen pt-8">
			<SubHeader title={"Panel de Administración"} buttons={buttons} />
			<ContextProvider>
				{isCreatingProduct ? (
					<CreateForm onClose={handleListProducts} /> // Mostrar el formulario de creación y cerrar cuando se ejecute handleListProducts
				) : (
					<ProductTable /> // Mostrar la tabla de productos
				)}
			</ContextProvider>
		</div>
	);
};

export default Admin;
