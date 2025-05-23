import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { store } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [avatar, setAvatar] = useState("/placeholder.svg");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [telegram, setTelegram] = useState("");
  const [vk, setVk] = useState("");
  const [youtube, setYoutube] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Проверяем, авторизован ли пользователь
    const currentUser = store.getCurrentUser();
    if (!currentUser) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate("/login", { replace: true });
      return;
    }
    
    // Загружаем данные пользователя
    setUsername(currentUser.username);
    setBio(currentUser.bio || "");
    setAvatar(currentUser.avatar || "/placeholder.svg");
    setTelegram(currentUser.telegram || "");
    setVk(currentUser.vk || "");
    setYoutube(currentUser.youtube || "");
    setCardNumber(currentUser.cardNumber || "");
  }, [navigate]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    // Обновляем профиль пользователя
    const updatedUser = store.updateUserProfile({
      bio,
      avatar,
      telegram,
      vk,
      youtube,
      cardNumber
    });
    
    if (updatedUser) {
      alert("Профиль успешно обновлен!");
    } else {
      alert("Произошла ошибка при обновлении профиля");
    }
  };

  const handleLogout = () => {
    store.logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow pb-8 px-4">
        <div className="max-w-3xl mx-auto border border-black p-4 relative wonky-border bg-white">
          <h2 className="text-3xl font-impact mb-6 text-center">
            Мой профиль
          </h2>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-40 h-40 border-2 border-black relative overflow-hidden wonky-border">
                <img 
                  src={avatar} 
                  alt="Аватарка" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <label className="cursor-pointer">
                <span className="inline-block py-1 px-3 bg-black text-white font-bold hover:bg-gray-800 transition-colors wonky-border-white">
                  Сменить аватарку
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <label className="block mb-1 font-bold">Имя пользователя:</label>
                <Input 
                  value={username} 
                  disabled
                  className="border-black wonky-border bg-gray-100"
                />
                <p className="text-sm mt-1 italic">*Имя пользователя нельзя изменить</p>
              </div>
              
              <div>
                <label className="block mb-1 font-bold">О себе:</label>
                <Textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)}
                  className="resize-none border-black wonky-border h-24"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-black pt-4">
            <h3 className="text-xl font-bold mb-4">Мои социальные сети:</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-bold">Телеграм:</label>
                <Input 
                  value={telegram} 
                  onChange={(e) => setTelegram(e.target.value)}
                  placeholder="https://t.me/username"
                  className="border-black wonky-border"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-bold">Вконтакте:</label>
                <Input 
                  value={vk} 
                  onChange={(e) => setVk(e.target.value)}
                  placeholder="https://vk.com/username"
                  className="border-black wonky-border"
                />
              </div>
              
              <div>
                <label className="block mb-1 font-bold">Ютуб канал:</label>
                <Input 
                  value={youtube} 
                  onChange={(e) => setYoutube(e.target.value)}
                  placeholder="https://youtube.com/@username"
                  className="border-black wonky-border"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-black pt-4">
            <h3 className="text-xl font-bold mb-4">Реквизиты для донатов:</h3>
            
            <div>
              <label className="block mb-1 font-bold">Номер карты:</label>
              <Input 
                value={cardNumber} 
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className="border-black wonky-border"
              />
              <p className="text-sm mt-1 italic">*Видно только вам</p>
            </div>
          </div>
          
          <div className="mt-8 flex justify-between">
            <Button 
              className="bg-black text-white font-bold hover:bg-gray-800 wonky-border-white"
              onClick={handleSave}
            >
              Сохранить изменения
            </Button>
            
            <Button 
              className="bg-white text-black border border-black font-bold hover:bg-gray-100 wonky-border"
              onClick={handleLogout}
            >
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
