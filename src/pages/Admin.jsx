import SubHeader from "../components/SubHeader";
import ProductTable from "../components/ProductTable";
import ContextProvider from "../utils/global.context";

const Admin = () => {
	return (
		<div className="min-h-screen pt-8">
			<SubHeader title={"Panel de Administración"} />
			<ContextProvider>
				<ProductTable />
			</ContextProvider>
		</div>
	);
};

export default Admin;
