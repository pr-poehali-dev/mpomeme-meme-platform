import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { FileImage } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center py-16 px-4 wonky-border bg-white mt-6">
      <div className="mx-auto w-32 h-32 mb-6">
        {/* Криво нарисованный грустный смайлик в "Paint" */}
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="45" fill="none" stroke="black" strokeWidth="2" />
          <circle cx="30" cy="40" r="5" fill="black" />
          <circle cx="70" cy="40" r="5" fill="black" />
          <path
            d="M 30 70 Q 50 50 70 70"
            fill="none"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      <h3 className="text-xl font-bold mb-2">Тут пока пусто</h3>
      <p className="mb-6">Самое время добавить первый мем!</p>
      
      <Link to="/add">
        <Button className="bg-black text-white hover:bg-gray-800 wonky-border-white flex items-center gap-2 mx-auto">
          <FileImage size={18} />
          <span>Добавить мем</span>
        </Button>
      </Link>
    </div>
  );
};

export default EmptyState;
