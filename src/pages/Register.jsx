const Register = () => {
  return (
    <div className="flex flex-col w-full pt-32 min-h-screen bg-black">
        <h1 className="text-3xl font-bold text-center text-white mt-8 mb-8">Registrarse</h1>
        <form 
            action=""
            className="flex flex-col w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
        >
            <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                    Nombre:
                </span>
                <input 
                    type="text" 
                    name="firstName" 
                    className="w-96 mt-1 p-2 border border-gray-300 rounded-lg" 
                    required 
                />
            </label>
            <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                    Apellido:
                </span>
                <input 
                    type="text" 
                    name="lastName" 
                    className="w-96 mt-1 p-2 border border-gray-300 rounded-lg" 
                    required 
                />
            </label>
            <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                    Email:
                </span>
                <input 
                    type="email" 
                    name="email" 
                    className="w-96 mt-1 p-2 border border-gray-300 rounded-lg" 
                    required 
                />
            </label>
            <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                    Contraseña:
                </span>
                <input 
                    type="password" 
                    name="password" 
                    className="w-96 mt-1 p-2 border border-gray-300 rounded-lg" 
                    required 
                />
            </label>
            <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">
                    Repetir Contraseña:
                </span>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    className="w-96 mt-1 p-2 border border-gray-300 rounded-lg" 
                    required 
                />
            </label>
            <button 
                type="submit"
                className="w-full py-2 mt-4 bg-primary text-black font-semibold rounded-lg"
            >
                Registrarse
            </button>
        </form>
    </div>
  )
}

export default Register