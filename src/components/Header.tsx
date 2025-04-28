import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const currentUser = store.getCurrentUser();
    if (currentUser) {
      setIsLoggedIn(true);
      setUsername(currentUser.username);
    } else {
      setIsLoggedIn(false);
      setUsername("");
    }
  }, []);

  return (
    <header className="border-b border-black bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="font-times text-3xl font-bold mr-4 wonky-text">
              MPOMEME
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-6">
            <Link to="/" className="font-bold hover:underline">
              Главная
            </Link>
            {isLoggedIn && (
              <Link to="/add" className="font-bold hover:underline">
                Добавить мем
              </Link>
            )}
            <a href="#" className="font-bold hover:underline">
              О сайте
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden border border-black p-1 wonky-border"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✖" : "☰"}
          </button>
          
          {/* Auth buttons */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="font-bold">{username}</span>
                <Link to="/profile">
                  <Button 
                    className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
                  >
                    Профиль
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button 
                    className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
                  >
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button 
                    className="bg-white border border-black text-black font-bold hover:bg-gray-100 wonky-border"
                  >
                    Регистрация
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-black pt-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Главная
              </Link>
              {isLoggedIn && (
                <Link 
                  to="/add" 
                  className="font-bold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Добавить мем
                </Link>
              )}
              <a 
                href="#" 
                className="font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                О сайте
              </a>
              {isLoggedIn ? (
                <>
                  <div className="font-bold">Привет, {username}!</div>
                  <Link 
                    to="/profile" 
                    className="bg-black text-white font-bold p-2 text-center wonky-border-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Профиль
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="bg-black text-white font-bold p-2 text-center wonky-border-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-white border border-black text-black font-bold p-2 text-center wonky-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
