import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FileImage } from "lucide-react";

const AddMeme = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("/placeholder.svg");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для отправки мема на сервер
    console.log({ title, description, category, image });
    alert("Мем добавлен успешно! (в демо режиме)");
    // Очистка формы
    setTitle("");
    setDescription("");
    setCategory("");
    setImage("/placeholder.svg");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pb-8 px-4">
        <div className="max-w-3xl mx-auto border border-black p-4 wonky-border bg-white">
          <h2 className="text-3xl font-impact mb-6 text-center">
            Добавить новый мем
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-bold">Заголовок мема:</label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border-black wonky-border"
                placeholder="Когда сдал ЕГЭ на 43 балла"
              />
            </div>
            
            <div>
              <label className="block mb-1 font-bold">Изображение:</label>
              <div className="border-2 border-dashed border-black p-4 text-center wonky-border mb-2">
                {image === "/placeholder.svg" ? (
                  <div className="py-8">
                    <FileImage className="mx-auto mb-2" size={40} />
                    <p>Нажми, чтобы загрузить мем</p>
                  </div>
                ) : (
                  <img 
                    src={image} 
                    alt="Предпросмотр" 
                    className="max-h-80 mx-auto"
                  />
                )}
                
                <input
                  type="file"
                  accept="image/*"
                  id="meme-image"
                  required={image === "/placeholder.svg"}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              
              <label 
                htmlFor="meme-image" 
                className="cursor-pointer flex justify-center"
              >
                <span className="inline-block py-1 px-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors wonky-border-white">
                  {image === "/placeholder.svg" ? "Выбрать файл" : "Изменить файл"}
                </span>
              </label>
            </div>
            
            <div>
              <label className="block mb-1 font-bold">Описание:</label>
              <Textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none border-black wonky-border h-24"
                placeholder="Я старался как мог, *честно* XD"
              />
              <p className="text-xs mt-1">
                Поддерживается форматирование: *жирный*, _курсив_, [ссылка](https://...)
              </p>
            </div>
            
            <div>
              <label className="block mb-1 font-bold">Категория:</label>
              <Input 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
                className="border-black wonky-border"
                placeholder="Образование, ЕГЭ"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
              >
                Опубликовать мем
              </Button>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddMeme;
