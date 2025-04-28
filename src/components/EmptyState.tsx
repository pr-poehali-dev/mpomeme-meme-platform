import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { store } from "@/lib/store";

const EmptyState = () => {
  const isLoggedIn = !!store.getCurrentUser();
  
  return (
    <div className="text-center my-20 p-8 border border-black wonky-border bg-white">
      <div className="mb-6">
        {/* Криво нарисованный грустный смайлик в Paint */}
        <svg 
          viewBox="0 0 100 100" 
          width="120" 
          height="120" 
          className="mx-auto"
        >
          {/* Круг лица с неровными краями */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="white" 
            stroke="black" 
            strokeWidth="2" 
            strokeDasharray="2 1"
          />
          
          {/* Глаза - немного кривые */}
          <ellipse 
            cx="35" 
            cy="40" 
            rx="5" 
            ry="7" 
            fill="black" 
            transform="rotate(-5, 35, 40)"
          />
          <ellipse 
            cx="65" 
            cy="38" 
            rx="5" 
            ry="7" 
            fill="black" 
            transform="rotate(10, 65, 38)"
          />
          
          {/* Грустный рот - кривая линия */}
          <path 
            d="M 30 70 Q 50 55 70 70" 
            fill="none" 
            stroke="black" 
            strokeWidth="3" 
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <h3 className="text-xl font-impact mb-2">
        Здесь пока нет мемов
      </h3>
      
      <p className="mb-6">
        Похоже, кто-то забыл загрузить мемы. Может, это будешь ты?
      </p>
      
      {isLoggedIn ? (
        <Link to="/add">
          <Button 
            className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
          >
            Добавить первый мем
          </Button>
        </Link>
      ) : (
        <Link to="/register">
          <Button 
            className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
          >
            Зарегистрироваться и добавить мем
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
