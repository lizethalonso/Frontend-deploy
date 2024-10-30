import { Link } from "react-router-dom";

const Logo = ({ slogan }) => {
	return (
		<Link to="/">
			<div className="flex justify-between items-center gap-2">
				<img src="/images/logo.png" className="w-24 h-full" alt="Logo" />

				
			</div>
		</Link>
	);
};

export default Logo;

