import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import ButtonSet from "./ButtonSet";

const Header = () => {
	const [isMobile, setIsMobile] = useState(false);

	const checkIfMobile = () => {
		// Puedes ajustar el valor 768 para que se adapte a tu diseño
		setIsMobile(window.innerWidth < 769);
	};

	useEffect(() => {
		checkIfMobile();
		window.addEventListener("resize", checkIfMobile);

		return () => {
			window.removeEventListener("resize", checkIfMobile);
		};
	}, []);

	const buttons = {
		1: [{ text: "Iniciar sesión", bgColor: "black", textColor: "primary", action: "" }],
		2: [{ text: "Registrarse", bgColor: "primary", textColor: "black", action: "" }],
	};

	return (
		<div className="flex bg-black justify-between items-center fixed top-0 w-screen h-16 z-10">
			<Logo slogan={!isMobile} /> {/* Pasar la propiedad slogan dependiendo del tamaño de la pantalla */}
			<ButtonSet buttons={buttons} />
		</div>
	);
};

export default Header;

