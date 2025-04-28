import { Button } from "./ui/button";
import { ThumbsUp, MessageSquare, DollarSign } from "lucide-react";

interface MemeCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  author: string;
  likes: number;
  comments: number;
}

const MemeCard = ({
  imageUrl,
  title,
  description,
  author,
  likes,
  comments
}: MemeCardProps) => {
  return (
    <div className="mb-8 wonky-border bg-white p-3 mx-auto max-w-2xl rotate-slightly">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-sm">Автор: {author}</span>
      </div>
      
      <div className="wonky-border overflow-hidden mb-3">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full object-contain max-h-[500px] paint-effect" 
        />
      </div>
      
      <p className="mb-4 ms-serif">{description}</p>
      
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-1 wonky-border">
            <ThumbsUp size={18} />
            <span>{likes}</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-1 wonky-border">
            <MessageSquare size={18} />
            <span>{comments}</span>
          </Button>
        </div>
        
        <Button className="wonky-border bg-black text-white hover:bg-gray-800 flex items-center gap-1">
          <DollarSign size={18} />
          <span>Поддержать автора</span>
        </Button>
      </div>
    </div>
  );
};

export default MemeCard;
