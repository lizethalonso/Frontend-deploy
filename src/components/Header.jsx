import Logo from "./Logo";
import ButtonSet from "./ButtonSet";
import { useNavigate } from "react-router-dom";
import { useContextGlobal } from '../utils/global.context';

const Header = () => {
  const { state, logoutUser } = useContextGlobal();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const buttons = {
    1: state.user ? [
      { text: "", bgColor: "transparent", textColor: "black", textSize: "sm", action: null, avatar: state.user.name ? state.user.name.substring(0, 2).toUpperCase() : '' }
    ] : [
      { text: "Iniciar sesión", bgColor: "primary", textColor: "black", textSize: "sm", action: () => navigate('/login') },
      { text: "Registrarse", bgColor: "primary", textColor: "black", textSize: "sm", action: () => navigate('/register') }
    ],
    2: state.user ? [{ text: "Cerrar Sesión", bgColor: "primary", textColor: "black", textSize: "sm", action: handleLogout }] : []
  };

  return (
    <header className="flex bg-background justify-between items-center fixed top-0 w-screen h-24 z-10 p-4 border-primary/50">
      <Logo size={16} />
      <div className="flex items-center">
        {state.user ? (
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-xl font-bold">
            {state.user.name ? state.user.name.substring(0, 2).toUpperCase() : ''}
          </div>
        ) : null}
        <ButtonSet buttons={buttons} />
      </div>
    </header>
  );
};

export default Header