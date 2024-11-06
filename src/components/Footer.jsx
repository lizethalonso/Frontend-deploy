import Social from "./Social";
import Logo from "./Logo";

const Footer = () => {
	return (
		<footer className="flex bg-black justify-between items-center inline-block bottom-0 w-full h-28 px-12 z-10 border-primary/50">
			<div className="flex flex-col items-center" >
				<Logo size={16}/>
				<h3 className="tiny-text text-primary pt-2">
					Todos los derechos reservados | 2024
				</h3>
			</div>
			<Social />
		</footer>
	);
};

export default Footer;
