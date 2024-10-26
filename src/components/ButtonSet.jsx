import Button from "./Button";

const ButtonSet = ({ buttons }) => {
	return (
		<div className="flex gap-5 px-5">
			{Object.values(buttons).map((buttonGroup, index) =>
				buttonGroup.map((button, btnIndex) => (
					<Button
						key={`${index}-${btnIndex}`}
						text={button.text}
						bgColor={button.bgColor}
						textColor={button.textColor}
					/>
				))
			)}
		</div>
	);
};

export default ButtonSet;
