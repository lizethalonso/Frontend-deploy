import { useContextGlobal } from "../utils/global.context";
import SubHeader from "../components/SubHeader";
import ProductTable from "../components/admin/ProductTable";
import UserTable from "../components/admin/UserTable"; 
import CategoryTable from "../components/admin/CategoryTable";
import Form from "../components/admin/Form";
import Message from "../components/admin/Message";
import IsMobile from "../components/admin/IsMobile";
import { useState } from "react";
import Sidebar from "../components/admin/Sidebar";

const AdminAsidePrueba = () => {
	const { isMobile, state } = useContextGlobal();
	const [isCreatingProduct, setIsCreatingProduct] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleAddItems = () => {
		setIsCreatingProduct(true);
	};

	const handleListItems = () => {
		setIsCreatingProduct(false);
	};

	const activeSection = state.activeSection;
	const handleListProducts = () => {
		setIsCreatingProduct(false);
		setEditingItem(null);
	};

	const buttons = {
		obras: [
		  { text: "Agregar producto", textColor: "primary", bgColor: "transparent", action: handleAddItems },
		  { text: "Lista de productos", textColor: "primary", bgColor: "transparent", action: handleListItems },
		],
		usuarios: [
		  { text: "Agregar usuario", textColor: "primary", bgColor: "transparent", action: handleAddItems },
		  { text: "Lista de usuarios", textColor: "primary", bgColor: "transparent", action: handleListItems },
		],
		categorias: [
		  { text: "Agregar categoría", textColor: "primary", bgColor: "transparent", action: handleAddItems },
		  { text: "Lista de categorías", textColor: "primary", bgColor: "transparent", action: handleListItems },
		],
	};

	const buttonsToDisplay = { [activeSection]: buttons[activeSection] || [] };	  

	return (
		<>
			{isMobile ? (
				<IsMobile />
			) : (
				<div className="min-h-screen pt-8 bg-black">
					<SubHeader
						title={"Panel de Administración"}
						buttons={buttonsToDisplay}
					/>
					{isCreatingProduct ? (
						<section className="flex w-screen h-screen-28 ">
							<Sidebar />
							<div className="flex flex-col items-center grow max-h-screen pt-44 relative">
								<Form
									edit={false}
									onClose={handleListProducts}
									setSuccessMessage={setSuccessMessage}
									setErrorMessage={setErrorMessage}
								/>
							</div>
						</section>
					) : (
						<section className="flex w-screen h-screen-28 ">
							<Sidebar />
							{activeSection === "obras" && <ProductTable setSuccessMessage={setSuccessMessage} setErrorMessage={setErrorMessage} />}
							{activeSection === "usuarios" && <UserTable />}
							{activeSection === "categorias" && <CategoryTable />}
						</section>
					)}

					{/* Mensajes a componentizar */}
					{successMessage && (
						<div className="fixed bottom-4 right-4 z-50 mb-4">
							<Message type="success" text={successMessage} onClose={() => setSuccessMessage("")} />
						</div>
					)}
					{errorMessage && (
						<div className="fixed bottom-4 right-4 z-50 mb-4">
							<Message type="danger" text={errorMessage} onClose={() => setErrorMessage("")} />
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default AdminAsidePrueba;
