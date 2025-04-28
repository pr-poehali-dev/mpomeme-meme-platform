import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white border-b border-black py-3 px-4 mb-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-impact tracking-tighter rotate-slightly">
            MPOMEME
          </h1>
        </div>
        
        <h2 className="text-xl font-impact tracking-wide hidden md:block">
          Раньше здесь был мат, пам пам пам
        </h2>
        
        <nav className="flex gap-4 wonky-border p-2 bg-white rotate-slightly-rev">
          <Link to="/" className="hover:underline font-bold">
            Главная
          </Link>
          <Link to="/add" className="hover:underline">
            Добавит мем
          </Link>
          <Link to="/profile" className="hover:underline">
            Профиль
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
