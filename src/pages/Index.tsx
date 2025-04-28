import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MemeCard from "@/components/MemeCard";
import EmptyState from "@/components/EmptyState";
import SortSelector from "@/components/SortSelector";

// Моковые данные для примера
const MOCK_MEMES = [
  {
    id: 1,
    imageUrl: "https://source.unsplash.com/random/800x600?bw,meme",
    title: "Когда сдал ЕГЭ на 43 балла",
    description: "Я старался как мог, *честно* XD",
    author: "ЕГЭник2025",
    likes: 234,
    comments: 42
  },
  {
    id: 2,
    imageUrl: "https://source.unsplash.com/random/800x600?monochrome,funny",
    title: "Первый день на работе вс последний",
    description: "Жиза не?? Кто согласен ставь лойс!!!1",
    author: "работяга",
    likes: 578,
    comments: 35
  },
  {
    id: 3,
    imageUrl: "https://source.unsplash.com/random/800x600?blackandwhite,joke",
    title: "Мем про учителя инфарматики",
    description: "На информатике училка все время говарит про какието циклы, а я один сижу и думаю про байтики и дисочки",
    author: "хацкер228",
    likes: 189,
    comments: 26
  }
];

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
