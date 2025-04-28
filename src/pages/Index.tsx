import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemeCard from "@/components/MemeCard";
import EmptyState from "@/components/EmptyState";
import SortSelector from "@/components/SortSelector";
import { store, Meme } from "@/lib/store";

const Index = () => {
  const [sortType, setSortType] = useState("new");
  const [memes, setMemes] = useState<Meme[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // При загрузке страницы загружаем мемы
  useEffect(() => {
    refreshMemes();
    // Проверяем, авторизован ли пользователь
    setIsLoggedIn(!!store.getCurrentUser());
  }, []);

  // Обновляем список мемов
  const refreshMemes = () => {
    if (sortType === "popular") {
      setMemes(store.getMemesSortedByPopular());
    } else {
      setMemes(store.getMemesSortedByNew());
    }
  };

  const handleSortChange = (value: string) => {
    setSortType(value);
    
    // Сортировка мемов
    if (value === "popular") {
      setMemes(store.getMemesSortedByPopular());
    } else {
      setMemes(store.getMemesSortedByNew());
    }
  };

  const handleLike = (memeId: string) => {
    store.likeMeme(memeId);
    refreshMemes();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-impact mb-6 text-center md:text-left">
            Раньше здесь был мат, пам пам пам
          </h2>
          
          <SortSelector onSortChange={handleSortChange} />
          
          {memes.length > 0 ? (
            <div className="space-y-6">
              {memes.map((meme) => (
                <MemeCard 
                  key={meme.id} 
                  meme={meme} 
                  isLoggedIn={isLoggedIn}
                  onLike={handleLike}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
