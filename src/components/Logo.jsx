
import { Link } from "react-router-dom";

const Logo = ({slogan}) => {
	return (
		<Link to="/">
			<div className="flex justify-between items-center gap-2">
				<img src="/images/logo.png" className="w-16 h-16" alt="Logo" />

				<h2 className={`text-amber-400 italic ${slogan ? "" : "hidden"}`}>Arte exclusivo, experiencias inolvidables.</h2>
			</div>
		</Link>
	);
};

export default Logo;
