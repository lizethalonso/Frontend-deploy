import Login from "./Login";
import Logo from "./Logo";

const Header = () => {
	return (
		<div className="flex bg-black justify-between items-center fixed top-0 w-screen h-20 ">
			<Logo />
			<Login />
		</div>
	);
};

export default Header;
