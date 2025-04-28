import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";
import { Meme } from "@/lib/store";

// Функция для форматирования описания (поддержка *жирный*, _курсив_, [ссылка])
const formatDescription = (text: string) => {
  // Заменяем *жирный текст*
  let formattedText = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  
  // Заменяем _курсив_
  formattedText = formattedText.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Заменяем [текст ссылки](URL)
  formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline">$1</a>');
  
  return formattedText;
};

interface MemeCardProps {
  meme: Meme;
  isLoggedIn: boolean;
  onLike: (memeId: string) => void;
}

const MemeCard = ({ meme, isLoggedIn, onLike }: MemeCardProps) => {
  const { id, title, imageUrl, description, category, authorName, likes, createdAt } = meme;
  
  // Форматируем дату создания
  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  // Форматируем описание (поддержка форматирования)
  const formattedDescription = formatDescription(description);

  return (
    <Card className="border-black wonky-border bg-white mb-6">
      <CardHeader className="p-4 border-b border-black">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm">Автор: {authorName}</span>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full object-cover max-h-[600px]"
          />
        </div>
        
        <div className="p-4">
          <div 
            className="mb-2"
            dangerouslySetInnerHTML={{ __html: formattedDescription }}
          />
          
          <div className="flex items-center space-x-2 text-sm mt-2">
            <span className="bg-black text-white px-2 py-0.5 wonky-border-white">{category}</span>
            <span className="text-gray-600">{formattedDate}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between p-4 border-t border-black">
        <div className="flex space-x-4">
          <button 
            className="flex items-center space-x-1 hover:text-gray-600"
            onClick={() => onLike(id)}
            disabled={!isLoggedIn}
          >
            <HeartIcon size={18} />
            <span>{likes}</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-gray-600">
            <MessageCircleIcon size={18} />
            <span>0</span>
          </button>
          
          <button className="flex items-center space-x-1 hover:text-gray-600">
            <ShareIcon size={18} />
          </button>
        </div>
        
        {isLoggedIn && (
          <Button className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white">
            Поддержать автора
          </Button>
        )}
        
        {!isLoggedIn && (
          <Link to="/login">
            <Button className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white">
              Войти чтобы лайкнуть
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default MemeCard;
