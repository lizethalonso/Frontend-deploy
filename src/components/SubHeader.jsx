import { useLocation } from "react-router-dom";
import ButtonSet from "./ButtonSet";

const SubHeader = ({ title }) => {
	const location = useLocation();
	if (location.pathname !== "/admin") return null;

	const buttons = {
		1: [
			{
				text: "Agregar productos",
				textColor: "black",
				bgColor: "primary",
				action: "",
			},
		],
		2: [
			{
				text: "Listar productos",
				textColor: "primary",
				bgColor: "black",
				action: "",
			},
		],
	};

	return (
		<div className="flex bg-white/50 fixed top-16 w-screen h-12 text-sm mt-8">
			<div className="flex bg-black/75 justify-between items-center fixed top-16 w-screen h-12 text-sm px-20 mt-8">
				<h2 className="text-white px-2">{title}</h2>
				<ButtonSet buttons={buttons} />
			</div>
		</div>
	);
};

export default SubHeader;
