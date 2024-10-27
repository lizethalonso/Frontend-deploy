import Social from "./Social";

const Footer = () => {
  return (
    <div className="flex bg-black justify-between items-center absolute bottom-0 w-full h-24 px-5">
			<h3 className="text-md text-amber-400">©2024 ArtXP</h3>
			<Social />
		</div>
  )
}

export default Footer