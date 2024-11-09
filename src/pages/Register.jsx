import { useState } from "react";
import { useContextGlobal } from '../utils/global.context.jsx';

const Register = () => {
  const { dispatch } = useContextGlobal();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName) newErrors.firstName = "El nombre es requerido";
    if (!formData.lastName) newErrors.lastName = "El apellido es requerido";
    if (!formData.email) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }
    if (!formData.password) newErrors.password = "La contraseña es requerida";
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      const newUser = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      };
      dispatch({ type: 'SET_USER', payload: newUser });
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex flex-col w-full pt-32 min-h-screen bg-black">
      <h1 className="text-3xl font-bold text-center text-white mt-8 mb-8">Registrarse</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <label className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Nombre:</span>
          <input
            type="text"
            name="firstName"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
        </label>
        
        <label className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Apellido:</span>
          <input
            type="text"
            name="lastName"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
        </label>
        
        <label className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Email:</span>
          <input
            type="email"
            name="email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
        </label>
        
        <label className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Contraseña:</span>
          <input
            type="password"
            name="password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
        </label>
        
        <label className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Confirmar Contraseña:</span>
          <input
            type="password"
            name="confirmPassword"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
        </label>
        
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-primary text-black font-semibold rounded-lg"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register