import { CiInstagram, CiFacebook, CiLinkedin } from "react-icons/ci";
import { BsTwitterX } from "react-icons/bs";

const Social = () => {
	const icons = [
		{ component: CiFacebook, url: "https://facebook.com" },
		{ component: CiInstagram, url: "https://instagram.com" },
		{ component: CiLinkedin, url: "https://linkedin.com" },
		{ component: BsTwitterX, url: "https://twitter.com" }
	];

	return (
		<div className="flex gap-5 items-center">
			{icons.map((icon, index) => {
				const Icon = icon.component;
				// Aplica "text-sm" solo al icono de X que es mas alto que los demas
				const iconClass = index === icons.length - 1 ? "text-md" : "text-xl";
				return (
					<a
						href={icon.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`text-white hover:text-amber-500 ${iconClass}`}
						key={index}
					>
						<Icon />
					</a>
				);
			})}
		</div>
	);
};

export default Social;
