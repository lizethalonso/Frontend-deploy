import SubHeader from "../components/SubHeader";
import ProductTable from "../components/ProductTable";

const Admin = () => {
	return (
		<div className="min-h-screen pt-8">
			<SubHeader title={"Panel de Administración"} />
			<ProductTable />
		</div>
	);
};

export default Admin;
