import { useContextGlobal } from "../utils/global.context"; 
import Logo from "./Logo";
import ButtonSet from "./ButtonSet";

const Header = () => {
	const { isMobile } = useContextGlobal(); 

	const buttons = {
		1: [{ text: "Iniciar sesión", bgColor: "black", textColor: "primary", action: "" }],
		2: [{ text: "Registrarse", bgColor: "primary", textColor: "black", action: "" }],
	};

	return (
		<div className="flex bg-background justify-between items-center fixed top-0 w-screen h-16 z-10 p-4">
			
			<Logo slogan={!isMobile} />
			<ButtonSet buttons={buttons} />
		</div>
	);
};

export default Header;
