

const Button = ({text, bgColor, textColor}) => {
  return (
    <button className={`bg-${bgColor} text-${textColor} border-${textColor} border-2 border-black px-2 py-1 rounded-2xl`}>
      {text}
    </button>
  )
}

export default Button
