import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemeCard from "@/components/MemeCard";
import EmptyState from "@/components/EmptyState";
import SortSelector from "@/components/SortSelector";

// Пустой массив мемов
const MOCK_MEMES: any[] = [];

const Index = () => {
  const [sortType, setSortType] = useState("new");
  const [memes, setMemes] = useState(MOCK_MEMES);

  const handleSortChange = (value: string) => {
    setSortType(value);
    
    // Сортировка мемов
    if (value === "popular") {
      setMemes([...MOCK_MEMES].sort((a, b) => b.likes - a.likes));
    } else {
      setMemes(MOCK_MEMES); // По умолчанию - сортировка по новизне (id)
    }
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
                <MemeCard key={meme.id} {...meme} />
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
