import Login from "./Login";
import Logo from "./Logo";

const Header = () => {
	return (
		<div className="flex bg-black justify-between items-center">
			<Logo />
			<Login />
		</div>
	);
};

export default Header;
