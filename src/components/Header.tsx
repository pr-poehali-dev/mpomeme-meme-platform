import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, FileImage, User, LogIn } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-black wonky-border-bottom py-2 px-4 bg-white">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Логотип */}
        <Link to="/" className="font-serif font-bold text-2xl paint-text">
          MPOMEME
        </Link>

        {/* Навигация - десктоп */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/add" className="flex items-center gap-1">
            <FileImage size={18} />
            <span>Добавить мем</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1">
            <User size={18} />
            <span>Профиль</span>
          </Link>
          <Link to="/login">
            <Button className="bg-black text-white hover:bg-gray-800 wonky-border-white flex items-center gap-1">
              <LogIn size={18} />
              <span>Войти</span>
            </Button>
          </Link>
        </nav>

        {/* Гамбургер-меню - мобильные */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Мобильное меню */}
      {isMenuOpen && (
        <nav className="md:hidden py-4 px-2 space-y-3 border-t border-black mt-2">
          <Link 
            to="/add" 
            className="block py-2 px-3 hover:bg-gray-100 wonky-border flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <FileImage size={18} />
            <span>Добавить мем</span>
          </Link>
          <Link 
            to="/profile" 
            className="block py-2 px-3 hover:bg-gray-100 wonky-border flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <User size={18} />
            <span>Профиль</span>
          </Link>
          <Link 
            to="/login" 
            className="block py-2 px-3 bg-black text-white hover:bg-gray-800 wonky-border flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <LogIn size={18} />
            <span>Войти</span>
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
