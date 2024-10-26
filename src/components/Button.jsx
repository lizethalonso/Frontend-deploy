

const Button = ({text, bgColor, textColor}) => {
  return (
    <button className={`bg-${bgColor} text-${textColor} border-${textColor} border-2 border-black px-3 py-1 rounded-2xl flex items-center justify-center`}>
      {text}
    </button>
  )
}

export default Button
