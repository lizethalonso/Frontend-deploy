import { useContextGlobal } from "../utils/global.context"; 
import Logo from "./Logo";
import ButtonSet from "./ButtonSet";

const Header = () => {
	const { isMobile } = useContextGlobal(); 

	const buttons = {
		1: [{ text: "Iniciar sesión", bgColor: "primary", textColor: "black", textSize:"sm" ,action: "" }],
		2: [{ text: "Registrarse", bgColor: "primary", textColor: "black", textSize:"sm" ,action: "" }],
	};

	return (
		<header className="flex bg-background justify-between items-center fixed top-0 w-screen h-24 z-10 p-4  border-primary/50 ">
			
			<Logo size={20} />
			<ButtonSet buttons={buttons} />
		</header>
	);
};

export default Header;
